import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  description: String,
  image: String, // 👈 add this'
  ownerPhone: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Listing ||
  mongoose.model("Listing", ListingSchema);