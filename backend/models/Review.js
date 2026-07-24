import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Customer name is required'],
        trim: true
    },
    customerEmail: {
        type: String,
        required: [true, 'Customer email is required'],
        trim: true,
        lowercase: true
    },
    tourName: {
        type: String,
        required: [true, 'Tour name is required'],
        trim: true
    },
    package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: [true, 'Tour package reference is required']
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: [true, 'Review text is required'],
        trim: true,
        maxlength: [1000, 'Review cannot exceed 1000 characters']
    },
    reviewDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    adminNotes: {
        type: String,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

// Index for faster queries
reviewSchema.index({ status: 1, createdAt: -1 });
reviewSchema.index({ customerId: 1 });
reviewSchema.index({ package: 1 }); 

const Review = mongoose.model('Review', reviewSchema);

export default Review;