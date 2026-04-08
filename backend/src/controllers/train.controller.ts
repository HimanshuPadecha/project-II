import { Request, Response } from "express";
import { Train } from "../models/train.model";
import { ApiError } from "../utils/ApiError";
import { ApiResonse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { z } from "zod";

const searchTrainSchma = z.object({
  source: z.string(),
  destination: z.string(),
  date: z.string().optional(),
  travelClass: z.string().optional(),
  trainType: z.string().optional(),
  availableBerth: z.boolean().optional(),
});

export const searchTrains = asyncHandler(
  async (req: Request, res: Response) => {
    
    const result = searchTrainSchma.safeParse(req.body)

    if(!result.success){
      throw new ApiError(400, `${result.error}`)
    }

    const { source, destination, date, travelClass, trainType, availableBerth } = result.data;

    if (!source || !destination) {
      throw new ApiError(400, "Source and destination are required");
    }

    const escapeRegExp = (string: string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    const sourceRegex = new RegExp(`${escapeRegExp(source)}`, "i");
    const destRegex = new RegExp(`${escapeRegExp(destination)}`, "i");

    let searchDay: string | null = null;
    if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate.getTime())) {
        const dayMap = ["S", "M", "T", "W", "T", "F", "S"];
        searchDay = dayMap[parsedDate.getDay()];
      }
    }

    // A train matches if it has BOTH stations AND the source's stopOrder < destination's stopOrder.
    // We use aggregation to accurately compare fields within the embedded stops array.
    const trains = await Train.aggregate([
      {
        $match: {
          ...(searchDay ? { daysOfOperation: searchDay } : {}),
          ...(trainType && trainType !== "ALL" ? { trainType: { $regex: new RegExp(escapeRegExp(trainType), "i") } } : {}),
          ...(availableBerth ? { "classes.availableSeats": { $gt: 0 } } : {}),
          ...(travelClass && travelClass !== "ALL" ? { "classes.className": { $regex: new RegExp(escapeRegExp(travelClass), "i") } } : {}),
          $or: [
            // Legacy direct match for trains that haven't seeded stops yet
            {
              source: { $regex: sourceRegex },
              destination: { $regex: destRegex },
            },
            // Dynamic stops array match
            {
              "stops.stationName": { $all: [sourceRegex, destRegex] },
            },
          ],
        },
      },
      // Filter down array to compare the stop orders if the "stops" array actually matched
      {
        $addFields: {
          sourceStop: {
            $arrayElemAt: [
              {
                $filter: {
                  input: { $ifNull: ["$stops", []] },
                  as: "stop",
                  cond: {
                    $regexMatch: {
                      input: "$$stop.stationName",
                      regex: sourceRegex,
                    },
                  },
                },
              },
              0,
            ],
          },
          destStop: {
            $arrayElemAt: [
              {
                $filter: {
                  input: { $ifNull: ["$stops", []] },
                  as: "stop",
                  cond: {
                    $regexMatch: {
                      input: "$$stop.stationName",
                      regex: destRegex,
                    },
                  },
                },
              },
              0,
            ],
          },
        },
      },
      {
        $match: {
          $expr: {
            $cond: {
              // If they matched in the stops array, ensure direction is valid
              if: {
                $and: [
                  { $ne: ["$sourceStop", null] },
                  { $ne: ["$destStop", null] },
                ],
              },
              then: { $lt: ["$sourceStop.stopOrder", "$destStop.stopOrder"] },
              // If they didn't match via stops, they must have matched via legacy source/dest strings
              else: true,
            },
          },
        },
      },
      {
        $unset: ["sourceStop", "destStop"], // Clean up auxiliary fields
      },
    ]);

    return res
      .status(200)
      .json(new ApiResonse(200, trains, "Trains fetched successfully"));
  },
);

export const getLiveStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const { trainNumber } = req.params;

    if (!trainNumber) {
      throw new ApiError(400, "Train number is required");
    }

    const train = await Train.findOne({ trainNumber });

    if (!train) {
      throw new ApiError(404, "Train not found");
    }

    // Build a dummy "live status" object since we don't have real-time GPS tracking hardware connected!
    const liveStatus = {
      trainNumber: train.trainNumber,
      trainName: train.trainName,
      currentStation: train.source, // Mocked
      delayMinutes: Math.floor(Math.random() * 30), // Mock random delay
      statusMessage: "On Route",
      scheduledDeparture: train.departureTime,
      scheduledArrival: train.arrivalTime,
    };

    return res
      .status(200)
      .json(new ApiResonse(200, liveStatus, "Live train status fetched"));
  },
);

export const searchStations = asyncHandler(
  async (req: Request, res: Response) => {
    const { query } = req.query;

    // Return all unique stations across `stops`, `source`, and `destination` to ensure backwards compat
    const stationsFromStops = await Train.distinct("stops.stationName");
    const stationsFromSource = await Train.distinct("source");
    const stationsFromDest = await Train.distinct("destination");

    const customSet = new Set([
      ...stationsFromStops,
      ...stationsFromSource,
      ...stationsFromDest,
    ]);
    let stations = Array.from(customSet).sort();

    // Filter down uniquely after flattening because MongoDB distinct arrays yield the entire tree
    if (query && typeof query === "string") {
      const filterRegex = new RegExp(`${query}`, "i");
      stations = stations.filter((station) => filterRegex.test(station));
    }

    return res
      .status(200)
      .json(new ApiResonse(200, stations, "Stations list fetched"));
  },
);
