import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDealer extends Document {
  businessName: string;
  applicantName: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  gstNumber?: string;
  experienceYears: string;
  annualTurnover?: string;
  existingBrands?: string;
  warehouseArea?: string;
  preferredProducts: string[];
  comments?: string;
  status: 'Pending' | 'Approved' | 'Under Review' | 'Rejected';
  createdAt: Date;
  updatedAt: Date;
}

const DealerSchema = new Schema<IDealer>(
  {
    businessName: { type: String, required: true, trim: true },
    applicantName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    state: { type: String, required: true, trim: true },
    district: { type: String, default: '', trim: true },
    city: { type: String, default: '', trim: true },
    pincode: { type: String, default: '', trim: true },
    gstNumber: { type: String, default: '', trim: true },
    experienceYears: { type: String, default: '1-3 Years' },
    annualTurnover: { type: String, default: '' },
    existingBrands: { type: String, default: '' },
    warehouseArea: { type: String, default: '' },
    preferredProducts: { type: [String], default: [] },
    comments: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Under Review', 'Rejected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Dealer: Model<IDealer> = mongoose.models.Dealer || mongoose.model<IDealer>('Dealer', DealerSchema);

export default Dealer;
