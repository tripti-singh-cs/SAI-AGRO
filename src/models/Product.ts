import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: string; // e.g. Bio-Fertilizers, Plant Growth Promoters, Micronutrients, Bio-Fungicides, Soil Conditioners
  subCategory?: string;
  tagline: string;
  description: string;
  composition: string; // Technical active ingredients / microbial strains
  targetCrops: string[]; // e.g. ['Paddy', 'Wheat', 'Sugarcane', 'Cotton', 'Vegetables', 'Fruits']
  benefits: string[];
  dosageAndApplication: {
    foliarSpray?: string;
    dripIrrigation?: string;
    soilApplication?: string;
    seedTreatment?: string;
  };
  packagingSizes: string[]; // e.g. ['250 ml', '500 ml', '1 Litre', '5 Litres', '25 Kg', '50 Kg']
  images: string[];
  brochureUrl?: string;
  isFeatured: boolean;
  inStock: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    subCategory: { type: String, default: '' },
    tagline: { type: String, default: '' },
    description: { type: String, required: true },
    composition: { type: String, default: '' },
    targetCrops: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    dosageAndApplication: {
      foliarSpray: { type: String, default: '' },
      dripIrrigation: { type: String, default: '' },
      soilApplication: { type: String, default: '' },
      seedTreatment: { type: String, default: '' },
    },
    packagingSizes: { type: [String], default: [] },
    images: { type: [String], default: [] },
    brochureUrl: { type: String, default: '' },
    isFeatured: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
