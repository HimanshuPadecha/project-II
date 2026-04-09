import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { Train } from "../models/train.model";
import { User } from "../models/user.model";
import { Booking } from "../models/booking.model";

dotenv.config({ path: "./.env" });

const stations = [
  "New Delhi (NDLS)", "Mumbai Central (BCT)", "Chennai Central (MAS)", "Howrah Jn (HWH)",
  "Bengaluru City (SBC)", "Hyderabad Decan (HYB)", "Ahmedabad Jn (ADI)", "Pune Jn (PUNE)",
  "Jaipur Jn (JP)", "Lucknow (LKO)", "Bhopal Jn (BPL)", "Patna Jn (PNBE)", "Kanpur Central (CNB)",
  "Nagpur (NGP)", "Indore Jn (INDB)", "Thiruvananthapuram (TVC)", "Varanasi Jn (BSB)", "Surat (ST)"
];

const trainTypes = ["SUPERFAST", "EXPRESS", "RAJDHANI", "SHATABDI", "DURONTO", "VANDE_BHARAT", "PASSENGER"];
const daysList = ["M", "T", "W", "T", "F", "S", "S"];

const generateRandomTime = () => {
  const h = Math.floor(Math.random() * 24).toString().padStart(2, '0');
  const m = Math.floor(Math.random() * 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}

const randomStation = () => stations[Math.floor(Math.random() * stations.length)];
const randomString = (length: number) => Math.random().toString(36).substring(2, 2 + length).toUpperCase();

const megaSeed = async () => {
  try {
    const mongoUri = process.env.DATABASE_URI;
    if (!mongoUri) throw new Error("DATABASE_URI missing from .env");
    
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB -> Generating Mega Data...");

    // Generate 50 Trains
    const newTrains = [];
    for (let i = 0; i < 50; i++) {
      let source = randomStation();
      let destination = randomStation();
      while(source === destination) destination = randomStation();
      
      const stopsCount = Math.floor(Math.random() * 5) + 2;
      const stops = [];
      for(let s = 1; s <= stopsCount; s++) {
        stops.push({
          stationName: s === 1 ? source : (s === stopsCount ? destination : randomStation()),
          arrivalTime: generateRandomTime(),
          departureTime: generateRandomTime(),
          stopOrder: s,
          distance: s * 100
        });
      }

      newTrains.push({
        trainNumber: `${Math.floor(Math.random() * 90000) + 10000}`,
        trainName: `Express ${randomString(4)}`,
        source,
        destination,
        departureTime: generateRandomTime(),
        arrivalTime: generateRandomTime(),
        duration: `${Math.floor(Math.random() * 20 + 2)}h 30m`,
        trainType: trainTypes[Math.floor(Math.random() * trainTypes.length)],
        daysOfOperation: ['M', 'W', 'F'],
        stops,
        classes: [
          { className: "SL", fare: Math.floor(Math.random() * 500) + 200, totalSeats: 400, availableSeats: Math.floor(Math.random() * 400) },
          { className: "3A", fare: Math.floor(Math.random() * 1000) + 800, totalSeats: 150, availableSeats: Math.floor(Math.random() * 150) },
          { className: "2A", fare: Math.floor(Math.random() * 2000) + 1500, totalSeats: 80, availableSeats: Math.floor(Math.random() * 80) }
        ]
      });
    }
    
    // Ignore duplicate keys for trains just in case
    const insertedTrains = await Train.insertMany(newTrains, { ordered: false }).catch(err => err.insertedDocs || []);
    console.log(`Created ${insertedTrains.length} mega trains.`);

    // Generate 50 Users
    const hashedPwd = await bcrypt.hash("password123", 10);
    const newUsers = [];
    for (let i = 0; i < 50; i++) {
        newUsers.push({
            username: `superUser_${randomString(6)}_${i}`,
            email: `superUser${i}_${randomString(4)}@test.com`,
            password: hashedPwd,
            savedPassengers: [
                { fullName: `Pass_${randomString(4)}`, age: 30, gender: "M", berthPreference: "LB" }
            ],
            recentSearches: []
        });
    }
    const insertedUsers = await User.insertMany(newUsers, { ordered: false }).catch(err => err.insertedDocs || []);
    console.log(`Created ${insertedUsers.length} mega users.`);

    // Generate 200 Bookings
    const newBookings = [];
    for(let i=0; i < 200; i++) {
        const randomTrain = insertedTrains[Math.floor(Math.random() * insertedTrains.length)];
        const randomUser = insertedUsers[Math.floor(Math.random() * insertedUsers.length)];
        if (!randomTrain || !randomUser) continue;

        newBookings.push({
            user: randomUser._id,
            train: randomTrain._id,
            pnrNumber: `100${randomString(7)}`,
            className: "3A",
            passengers: [
                { fullName: `John ${randomString(3)}`, age: 25, gender: "M", status: "CONFIRMED", berthAllocated: "B2-14" },
                { fullName: `Jane ${randomString(3)}`, age: 24, gender: "F", status: "CONFIRMED", berthAllocated: "B2-15" }
            ],
            contactEmail: randomUser.email,
            contactPhone: "9999999999",
            fareBreakdown: { baseFare: 1000, superfastCharge: 50, reservationCharge: 40, insurance: 10, gst: 50, totalAmount: 1150 },
            status: ["CONFIRMED", "PENDING", "CANCELLED"][Math.floor(Math.random() * 3)],
            dateOfJourney: new Date(Date.now() + Math.random() * 1000000000)
        });
    }
    const insertedBookings = await Booking.insertMany(newBookings, { ordered: false }).catch(err => err.insertedDocs || []);
    console.log(`Created ${insertedBookings.length} mega bookings.`);

    console.log("Mega seed completed!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error: ", error);
    process.exit(1);
  }
};

megaSeed();
