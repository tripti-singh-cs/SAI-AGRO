import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMedia extends Document {
  title: string;
  type: 'video' | 'image';
  url: string;
  thumbnailUrl?: string;
  category: 'Factory Tour' | 'Field Trial' | 'Product Demonstration' | 'Farmer Experience' | 'Corporate';
  description?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, enum: ['video', 'image'], default: 'video' },
    url: { type: String, required: true },
    thumbnailUrl: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Factory Tour', 'Field Trial', 'Product Demonstration', 'Farmer Experience', 'Corporate'],
      default: 'Product Demonstration',
    },
    description: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Media: Model<IMedia> = mongoose.models.Media || mongoose.model<IMedia>('Media', MediaSchema);

export default Media;
