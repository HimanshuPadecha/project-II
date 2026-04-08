import mongoose from "mongoose";
import dotenv from "dotenv";
import { Train } from "../models/train.model";

dotenv.config({ path: "./.env" });

const mockTrains = [
  {
    trainNumber: "12424",
    trainName: "NDLS MULTI-STOP RAJDHANI",
    source: "New Delhi (NDLS)",
    destination: "Mumbai Central (BCT)",
    departureTime: "16:30",
    arrivalTime: "04:45",
    duration: "12h 15m",
    trainType: "SUPERFAST",
    daysOfOperation: ["M", "T", "W", "T", "F", "S", "S"],
    stops: [
      {
        stationName: "New Delhi (NDLS)",
        arrivalTime: "16:30",
        departureTime: "16:30",
        stopOrder: 1,
        distance: 0,
      },
      {
        stationName: "Kota Jn (KOTA)",
        arrivalTime: "20:30",
        departureTime: "20:40",
        stopOrder: 2,
        distance: 466,
      },
      {
        stationName: "Vadodara (BRC)",
        arrivalTime: "01:20",
        departureTime: "01:30",
        stopOrder: 3,
        distance: 993,
      },
      {
        stationName: "Mumbai Central (BCT)",
        arrivalTime: "04:45",
        departureTime: "04:45",
        stopOrder: 4,
        distance: 1386,
      },
    ],
    classes: [
      { className: "3A", fare: 2450, totalSeats: 200, availableSeats: 145 },
      { className: "2A", fare: 3890, totalSeats: 100, availableSeats: -12 },
      { className: "1A", fare: 5200, totalSeats: 50, availableSeats: -45 },
    ],
  },
  {
    trainNumber: "12268",
    trainName: "BCT DURONTO",
    source: "New Delhi (NDLS)",
    destination: "Mumbai Central (BCT)",
    departureTime: "23:40",
    arrivalTime: "10:45",
    duration: "11h 05m",
    trainType: "DURONTO",
    daysOfOperation: ["M", "T", "W", "T", "F", "S", "S"],
    stops: [
      {
        stationName: "New Delhi (NDLS)",
        arrivalTime: "23:40",
        departureTime: "23:40",
        stopOrder: 1,
      },
      {
        stationName: "Mumbai Central (BCT)",
        arrivalTime: "10:45",
        departureTime: "10:45",
        stopOrder: 2,
      },
    ],
    classes: [
      { className: "3A", fare: 2100, totalSeats: 250, availableSeats: 23 },
      { className: "2A", fare: 3450, totalSeats: 120, availableSeats: 12 },
    ],
  },
  {
    trainNumber: "12952",
    trainName: "AUGUST KRANTI",
    source: "New Delhi (NDLS)",
    destination: "Mumbai Central (BCT)",
    departureTime: "17:15",
    arrivalTime: "11:00",
    duration: "17h 45m",
    trainType: "EXPRESS",
    daysOfOperation: ["M", "T", "W", "T", "F", "S", "S"],
    stops: [
      {
        stationName: "New Delhi (NDLS)",
        arrivalTime: "17:15",
        departureTime: "17:15",
        stopOrder: 1,
      },
      {
        stationName: "Mathura Jn (MTJ)",
        arrivalTime: "19:00",
        departureTime: "19:05",
        stopOrder: 2,
      },
      {
        stationName: "Sawai Madhopur (SWM)",
        arrivalTime: "21:30",
        departureTime: "21:35",
        stopOrder: 3,
      },
      {
        stationName: "Mumbai Central (BCT)",
        arrivalTime: "11:00",
        departureTime: "11:00",
        stopOrder: 4,
      },
    ],
    classes: [
      { className: "SL", fare: 750, totalSeats: 400, availableSeats: 120 },
      { className: "3A", fare: 1950, totalSeats: 150, availableSeats: -5 },
      { className: "2A", fare: 3200, totalSeats: 80, availableSeats: 42 },
    ],
  },
  {
    trainNumber: "12004",
    trainName: "LUCKNOW SHATABDI",
    source: "New Delhi (NDLS)",
    destination: "Lucknow (LKO)",
    departureTime: "06:10",
    arrivalTime: "12:40",
    duration: "6h 30m",
    trainType: "SHATABDI",
    daysOfOperation: ["M", "T", "W", "T", "F", "S"],
    stops: [
      {
        stationName: "New Delhi (NDLS)",
        arrivalTime: "06:10",
        departureTime: "06:10",
        stopOrder: 1,
      },
      {
        stationName: "Kanpur Central (CNB)",
        arrivalTime: "11:20",
        departureTime: "11:25",
        stopOrder: 2,
      },
      {
        stationName: "Lucknow (LKO)",
        arrivalTime: "12:40",
        departureTime: "12:40",
        stopOrder: 3,
      },
    ],
    classes: [
      { className: "CC", fare: 1250, totalSeats: 300, availableSeats: 85 },
      { className: "EA", fare: 2450, totalSeats: 40, availableSeats: 12 },
    ],
  },
  {
    trainNumber: "12902",
    trainName: "Gujarat Mail",
    source: "Ahmedabad Jn (ADI)",
    destination: "Mumbai Central (BCT)",
    departureTime: "22:00",
    arrivalTime: "06:25",
    duration: "8h 25m",
    trainType: "Superfast",
    daysOfOperation: ["M", "T", "W", "T", "F", "S", "S"],
    stops: [
      {
        stationName: "Ahmedabad Jn (ADI)",
        arrivalTime: "-",
        departureTime: "22:00",
        stopOrder: 1,
        distance: 0
      },
      {
        stationName: "Vadodara Jn (BRC)",
        arrivalTime: "23:45",
        departureTime: "23:50",
        stopOrder: 2,
        distance: 100
      },
      {
        stationName: "Surat (ST)",
        arrivalTime: "01:40",
        departureTime: "01:45",
        stopOrder: 3,
        distance: 229
      },
      {
        stationName: "Mumbai Central (BCT)",
        arrivalTime: "06:25",
        departureTime: "-",
        stopOrder: 4,
        distance: 492
      }
    ],
    classes: [
      { className: "Sleeper (SL)", fare: 380, totalSeats: 450, availableSeats: 320 },
      { className: "AC 3 Tier (3A)", fare: 1050, totalSeats: 180, availableSeats: 95 },
      { className: "AC 2 Tier (2A)", fare: 1480, totalSeats: 90, availableSeats: 42 }
    ],
    createdAt: "2026-04-05T12:00:00.000Z",
    updatedAt: "2026-04-05T12:00:00.000Z"
  },
  {
    trainNumber: "12957",
    trainName: "Swarna Jayanti Rajdhani",
    source: "Ahmedabad Jn (ADI)",
    destination: "New Delhi (NDLS)",
    departureTime: "17:40",
    arrivalTime: "08:00",
    duration: "14h 20m",
    trainType: "Rajdhani",
    daysOfOperation: ["M", "T", "W", "T", "F", "S", "S"],
    stops: [
      {
        stationName: "Ahmedabad Jn (ADI)",
        arrivalTime: "-",
        departureTime: "17:40",
        stopOrder: 1,
        distance: 0
      },
      {
        stationName: "Jaipur Jn (JP)",
        arrivalTime: "02:10",
        departureTime: "02:20",
        stopOrder: 2,
        distance: 450
      },
      {
        stationName: "New Delhi (NDLS)",
        arrivalTime: "08:00",
        departureTime: "-",
        stopOrder: 3,
        distance: 856
      }
    ],
    classes: [
      { className: "AC 1st Class (1A)", fare: 3850, totalSeats: 40, availableSeats: 18 },
      { className: "AC 2 Tier (2A)", fare: 2250, totalSeats: 120, availableSeats: 65 },
      { className: "AC 3 Tier (3A)", fare: 1580, totalSeats: 200, availableSeats: 110 }
    ],
    createdAt: "2026-04-05T12:00:00.000Z",
    updatedAt: "2026-04-05T12:00:00.000Z"
  },
  {
    trainNumber: "22953",
    trainName: "Gujarat SF Express",
    source: "Ahmedabad Jn (ADI)",
    destination: "Mumbai Central (BCT)",
    departureTime: "07:00",
    arrivalTime: "15:55",
    duration: "8h 55m",
    trainType: "Superfast",
    daysOfOperation: ["M", "T", "W", "T", "F", "S", "S"],
    stops: [
      {
        stationName: "Ahmedabad Jn (ADI)",
        arrivalTime: "-",
        departureTime: "07:00",
        stopOrder: 1,
        distance: 0
      },
      {
        stationName: "Nadiad Jn (ND)",
        arrivalTime: "07:45",
        departureTime: "07:47",
        stopOrder: 2,
        distance: 45
      },
      {
        stationName: "Vadodara Jn (BRC)",
        arrivalTime: "08:35",
        departureTime: "08:40",
        stopOrder: 3,
        distance: 99
      },
      {
        stationName: "Bharuch Jn (BH)",
        arrivalTime: "09:40",
        departureTime: "09:42",
        stopOrder: 4,
        distance: 169
      },
      {
        stationName: "Surat (ST)",
        arrivalTime: "10:45",
        departureTime: "10:50",
        stopOrder: 5,
        distance: 228
      },
      {
        stationName: "Mumbai Central (BCT)",
        arrivalTime: "15:55",
        departureTime: "-",
        stopOrder: 6,
        distance: 492
      }
    ],
    classes: [
      { className: "Sleeper (SL)", fare: 320, totalSeats: 420, availableSeats: 280 },
      { className: "AC Chair Car (CC)", fare: 780, totalSeats: 80, availableSeats: 55 },
      { className: "AC 3 Tier (3A)", fare: 980, totalSeats: 160, availableSeats: 105 }
    ],
    createdAt: "2026-04-05T12:00:00.000Z",
    updatedAt: "2026-04-05T12:00:00.000Z"
  },
  {
    trainNumber: "16501",
    trainName: "Ahmedabad - Yesvantpur Express",
    source: "Ahmedabad Jn (ADI)",
    destination: "Yesvantpur Jn (YPR)",
    departureTime: "18:40",
    arrivalTime: "04:45",
    duration: "34h 05m",
    trainType: "Express",
    daysOfOperation: ["T"],
    stops: [
      {
        stationName: "Ahmedabad Jn (ADI)",
        arrivalTime: "-",
        departureTime: "18:40",
        stopOrder: 1,
        distance: 0
      },
      {
        stationName: "Vadodara Jn (BRC)",
        arrivalTime: "20:35",
        departureTime: "20:45",
        stopOrder: 2,
        distance: 100
      },
      {
        stationName: "Surat (ST)",
        arrivalTime: "22:30",
        departureTime: "22:35",
        stopOrder: 3,
        distance: 229
      },
      {
        stationName: "Pune Jn (PUNE)",
        arrivalTime: "07:20",
        departureTime: "07:30",
        stopOrder: 4,
        distance: 631
      },
      {
        stationName: "Yesvantpur Jn (YPR)",
        arrivalTime: "04:45",
        departureTime: "-",
        stopOrder: 5,
        distance: 1796
      }
    ],
    classes: [
      { className: "Sleeper (SL)", fare: 820, totalSeats: 380, availableSeats: 240 },
      { className: "AC 3 Tier (3A)", fare: 2150, totalSeats: 140, availableSeats: 78 },
      { className: "AC 2 Tier (2A)", fare: 3150, totalSeats: 70, availableSeats: 35 }
    ],
    createdAt: "2026-04-05T12:00:00.000Z",
    updatedAt: "2026-04-05T12:00:00.000Z"
  },
  {
    trainNumber: "20901",
    trainName: "Ahmedabad - Mumbai Vande Bharat Express",
    source: "Ahmedabad Jn (ADI)",
    destination: "Mumbai Central (BCT)",
    departureTime: "06:30",
    arrivalTime: "13:15",
    duration: "6h 45m",
    trainType: "Vande Bharat",
    daysOfOperation: ["M", "T", "W", "T", "F", "S"],
    stops: [
      {
        stationName: "Ahmedabad Jn (ADI)",
        arrivalTime: "-",
        departureTime: "06:30",
        stopOrder: 1,
        distance: 0
      },
      {
        stationName: "Vadodara Jn (BRC)",
        arrivalTime: "08:00",
        departureTime: "08:02",
        stopOrder: 2,
        distance: 100
      },
      {
        stationName: "Surat (ST)",
        arrivalTime: "09:20",
        departureTime: "09:22",
        stopOrder: 3,
        distance: 229
      },
      {
        stationName: "Mumbai Central (BCT)",
        arrivalTime: "13:15",
        departureTime: "-",
        stopOrder: 4,
        distance: 492
      }
    ],
    classes: [
      { className: "AC Chair Car (CC)", fare: 1250, totalSeats: 120, availableSeats: 75 },
      { className: "Executive Chair (EC)", fare: 2450, totalSeats: 40, availableSeats: 22 }
    ],
    createdAt: "2026-04-05T12:00:00.000Z",
    updatedAt: "2026-04-05T12:00:00.000Z"
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.DATABASE_URI;
    if (!mongoUri) {
      console.error("DATABASE_URI is not defined in .env");
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");

    // Clear existing trains
    await Train.deleteMany({});
    console.log("Cleared existing trains");

    // Insert new trains
    await Train.insertMany(mockTrains);
    console.log("Mock trains seeded successfully");

    process.exit(0);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error seeding database: ", error.message);
    } else {
      console.error("Error seeding database: ", error);
    }
    process.exit(1);
  }
};

seedDB();
