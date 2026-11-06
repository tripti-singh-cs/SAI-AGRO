import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISetting extends Document {
  companyName: string;
  tagline: string;
  phonePrimary: string;
  phoneSecondary?: string;
  whatsappNumber: string;
  emailPrimary: string;
  emailSupport?: string;
  registeredAddress: string;
  factoryAddress?: string;
  gstin?: string;
  stats: {
    farmersHelped: string;
    productsDelivered: string;
    statesPresence: string;
    yieldImprovement: string;
  };
  socialLinks: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
  };
  heroVideoUrl: string;
  heroVideoUrl2: string;
}

const SettingSchema = new Schema<ISetting>(
  {
    companyName: { type: String, default: 'SAI AGRO INDUSTRIES' },
    tagline: { type: String, default: 'Empowering Farmers with Next-Gen Bio & Organic Crop Solutions' },
    phonePrimary: { type: String, default: '+91 98765 43210' },
    phoneSecondary: { type: String, default: '+91 91234 56789' },
    whatsappNumber: { type: String, default: '919876543210' },
    emailPrimary: { type: String, default: 'info@saiagroindustries.com' },
    emailSupport: { type: String, default: 'support@saiagroindustries.com' },
    registeredAddress: { type: String, default: 'Industrial Growth Centre, Agro Complex, India' },
    factoryAddress: { type: String, default: 'Plot No. 45-48, Sector 3, Bio-Agri Industrial Zone' },
    gstin: { type: String, default: '10AAACS1234F1Z5' },
    stats: {
      farmersHelped: { type: String, default: '50,000+' },
      productsDelivered: { type: String, default: '1,20,000+' },
      statesPresence: { type: String, default: '15+ States' },
      yieldImprovement: { type: String, default: '25-35%' },
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com' },
      youtube: { type: String, default: 'https://youtube.com' },
      instagram: { type: String, default: 'https://instagram.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      whatsapp: { type: String, default: 'https://wa.me/919876543210' },
    },
    heroVideoUrl: {
      type: String,
      default: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
    },
    heroVideoUrl2: {
      type: String,
      default: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
    },
  },
  {
    timestamps: true,
  }
);

const Setting: Model<ISetting> = mongoose.models.Setting || mongoose.model<ISetting>('Setting', SettingSchema);

export default Setting;
