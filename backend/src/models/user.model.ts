import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImg?: string;
  recentSearches: Array<{
    source: string;
    destination: string;
    date: Date;
  }>;
  savedPassengers: Array<{
    fullName: string;
    age: string | number;
    gender: string;
    berthPreference: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImg: {
      type: String,
    },
    recentSearches: [
      {
        source: { type: String, required: true },
        destination: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],
    savedPassengers: [
      {
        fullName: { type: String, required: true },
        age: { type: Schema.Types.Mixed, required: true }, // To support string or number from UI
        gender: { type: String, required: true },
        berthPreference: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
