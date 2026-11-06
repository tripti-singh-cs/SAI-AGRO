import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string; // e.g., 'Crop Nutrition', 'Soil Health', 'Bio-Pest Control', 'Modern Farming'
  author: string;
  readTime: string;
  coverImage: string;
  summary: string;
  content: string; // HTML / Markdown rich content
  tags: string[];
  isPublished: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: 'Crop Nutrition' },
    author: { type: String, default: 'Sai Agro Agronomy Team' },
    readTime: { type: String, default: '4 min read' },
    coverImage: { type: String, default: '' },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
