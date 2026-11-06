import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReview extends Document {
  farmerName: string;
  village: string;
  district: string;
  state: string;
  cropGrown: string;
  productUsed: string;
  yieldIncreasePercent: string;
  rating: number;
  reviewText: string;
  farmerPhoto?: string;
  isVerified: boolean;
  featured: boolean;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>(
  {
    farmerName: { type: String, required: true, trim: true },
    village: { type: String, default: '' },
    district: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    cropGrown: { type: String, required: true },
    productUsed: { type: String, required: true },
    yieldIncreasePercent: { type: String, default: '+25%' },
    rating: { type: Number, default: 5, min: 1, max: 5 },
    reviewText: { type: String, required: true },
    farmerPhoto: { type: String, default: '' },
    isVerified: { type: Boolean, default: true },
    featured: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
