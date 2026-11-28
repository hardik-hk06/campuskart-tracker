
import mongoose, { Schema, Document } from "mongoose";

export interface IVehicle extends Document {
  vehicleCode: string;
  driverName: string;
  status: "available" | "busy" | "offline";
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  speed: number;
  lastUpdated: Date;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    vehicleCode: {
      type: String,
      required: true,
      unique: true,
    },

    driverName: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "busy", "offline"],
      default: "offline",
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    speed: {
      type: Number,
      default: 0,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Enables location-based searching
vehicleSchema.index({ location: "2dsphere" });

const Vehicle = mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;
