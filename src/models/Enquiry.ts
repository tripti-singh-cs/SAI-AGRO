import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  fullName: string;
  phone: string;
  email?: string;
  state: string;
  district?: string;
  inquiryType: 'Product Quote' | 'Dealership' | 'Farmer Advisory' | 'Bulk Order' | 'General';
  productName?: string;
  quantity?: string;
  message: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Converted' | 'Closed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EnquirySchema = new Schema<IEnquiry>(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, default: '', trim: true },
    state: { type: String, default: '', trim: true },
    district: { type: String, default: '', trim: true },
    inquiryType: {
      type: String,
      enum: ['Product Quote', 'Dealership', 'Farmer Advisory', 'Bulk Order', 'General'],
      default: 'Product Quote',
    },
    productName: { type: String, default: '' },
    quantity: { type: String, default: '' },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['New', 'In Review', 'Contacted', 'Converted', 'Closed'],
      default: 'New',
    },
    notes: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const Enquiry: Model<IEnquiry> = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);

export default Enquiry;
