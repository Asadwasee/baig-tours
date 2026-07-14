import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const packageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, required: true }, // e.g., Family, Honeymoon, Student
    destination: { type: String, required: true }, // e.g., Hunza, Skardu, Turkey
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: 0 },
    duration: { type: String, required: true }, // e.g., 5 Days / 4 Nights
    availableSeats: { type: Number, required: true },
    departureDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    hotelInfo: { type: String },
    transportDetails: { type: String },
    mealsIncluded: { type: Boolean, default: false },
    description: { type: String, required: true },
    highlights: [{ type: String }],
    includedServices: [{ type: String }],
    excludedServices: [{ type: String }],
    itinerary: [itinerarySchema],
    faqs: [faqSchema],
    images: [{ type: String }], // Cloudinary or Local paths
    videos: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isUpcoming: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Package = mongoose.model("Package", packageSchema);
export default Package;
