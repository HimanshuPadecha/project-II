import mongoose, { Schema, Document } from "mongoose";

export interface ITrain extends Document {
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  trainType: string;
  daysOfOperation: string[];
  stops: Array<{
    stationName: string;
    arrivalTime: string;
    departureTime: string;
    stopOrder: number;
    distance?: number;
  }>;
  classes: Array<{
    className: string;
    fare: number;
    totalSeats: number;
    availableSeats: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const TrainSchema: Schema<ITrain> = new Schema(
  {
    trainNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    trainName: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    departureTime: {
      type: String, // Can be ISO Date string or format like "HH:mm"
      required: true,
    },
    arrivalTime: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    trainType: {
      type: String,
      required: true,
    },
    daysOfOperation: {
      type: [String],
      required: true,
    },
    stops: [
      {
        stationName: { type: String, required: true },
        arrivalTime: { type: String, required: true },
        departureTime: { type: String, required: true },
        stopOrder: { type: Number, required: true },
        distance: { type: Number },
      },
    ],
    classes: [
      {
        className: { type: String, required: true },
        fare: { type: Number, required: true, min: 0 },
        totalSeats: { type: Number, required: true, min: 1 },
        availableSeats: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Train = mongoose.model<ITrain>("Train", TrainSchema);
