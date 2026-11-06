import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  slug: string;
  iconName?: string;
  image?: string;
  description: string;
  itemCount: number;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    iconName: { type: String, default: 'Sprout' },
    image: { type: String, default: '' },
    description: { type: String, default: '' },
    itemCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Category: Model<ICategory> = mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);

export default Category;
