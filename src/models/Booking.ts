import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  listingId: String,
  listingTitle: String,
  renterName: String,
  renterPhone: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);