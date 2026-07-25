import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      index: true,
    },
    isSubscribed: {
      type: Boolean,
      default: true,
    },
    source: {
      type: String,
      default: 'website_footer',
      trim: true,
    },
    unsubscribedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

export default Newsletter;