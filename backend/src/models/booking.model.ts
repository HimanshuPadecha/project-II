import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  train: mongoose.Types.ObjectId;
  pnrNumber: string;
  className: string;
  passengers: Array<{
    fullName: string;
    age: number | string;
    gender: string;
    berthPreference?: string;
    berthAllocated?: string;
    status: "CONFIRMED" | "RAC" | "WL";
  }>;
  contactEmail: string;
  contactPhone: string;
  fareBreakdown: {
    baseFare: number;
    superfastCharge: number;
    reservationCharge: number;
    insurance: number;
    gst: number;
    totalAmount: number;
  };
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema<IBooking> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    train: {
      type: Schema.Types.ObjectId,
      ref: "Train",
      required: true,
    },
    pnrNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    className: {
      type: String,
      required: true,
    },
    passengers: [
      {
        fullName: { type: String, required: true },
        age: { type: Schema.Types.Mixed, required: true },
        gender: { type: String, required: true },
        berthPreference: { type: String },
        berthAllocated: { type: String },
        status: { type: String, enum: ["CONFIRMED", "RAC", "WL"], default: "CONFIRMED" },
      },
    ],
    contactEmail: { type: String, required: true },
    contactPhone: { type: String, required: true },
    fareBreakdown: {
      baseFare: { type: Number, required: true },
      superfastCharge: { type: Number, required: true },
      reservationCharge: { type: Number, required: true },
      insurance: { type: Number, required: true },
      gst: { type: Number, required: true },
      totalAmount: { type: Number, required: true },
    },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
