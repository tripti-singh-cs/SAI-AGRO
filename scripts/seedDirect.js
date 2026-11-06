const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://triptisinghh897_db_user:z5G4j5HbW2WPv7Su@cluster0.rdov0aq.mongodb.net/sai_agro?retryWrites=true&w=majority';

async function seed() {
  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected successfully to MongoDB.');

  const db = mongoose.connection.db;

  // 1. Seed Admin
  const usersCollection = db.collection('users');
  const existingAdmin = await usersCollection.findOne({ email: 'admin@saiagro.com' });
  if (!existingAdmin) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('Admin@123', salt);
    await usersCollection.insertOne({
      name: 'Sai Agro Administrator',
      email: 'admin@saiagro.com',
      passwordHash,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Admin user created: admin@saiagro.com / Admin@123');
  } else {
    console.log('Admin user already exists.');
  }

  // 2. Seed Settings
  const settingsCollection = db.collection('settings');
  const existingSetting = await settingsCollection.findOne({});
  if (!existingSetting) {
    await settingsCollection.insertOne({
      companyName: 'SAI AGRO INDUSTRIES',
      tagline: 'Pioneering Sustainable Agriculture & High-Yield Bio Solutions',
      phonePrimary: '7856057415',
      phoneSecondary: '7856057415',
      whatsappNumber: '7856057415',
      emailPrimary: 'rajputblaze415@gmail.com',
      emailSupport: 'triptisinghh897@gmail.com',
      registeredAddress: 'ramnagar, near siv mandir',
      factoryAddress: 'ramnagar, near siv mandir west chanparan bihar 845106',
      gstin: '10AAACS9988F1Z9',
      stats: {
        farmersHelped: '50,000+',
        productsDelivered: '1,50,000+',
        statesPresence: '18+ States',
        yieldImprovement: '25-35%',
      },
      heroVideoUrl: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
      heroVideoUrl2: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Default company settings seeded.');
  }

  // 3. Seed Categories
  const categoriesCollection = db.collection('categories');
  const catCount = await categoriesCollection.countDocuments();
  if (catCount === 0) {
    await categoriesCollection.insertMany([
      {
        name: 'Bio-Fertilizers & Inoculants',
        slug: 'bio-fertilizers',
        iconName: 'Sprout',
        image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.37.jpeg',
        description: 'Microbial bio-cultures that enhance atmospheric nitrogen fixation and phosphorus solubilization.',
        itemCount: 4,
        featured: true,
        order: 1,
        createdAt: new Date(),
      },
      {
        name: 'Plant Growth Regulators & Promoters',
        slug: 'plant-growth-promoters',
        iconName: 'TrendingUp',
        image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38 (1).jpeg',
        description: 'Formulations enriched with amino acids, seaweed extracts, and phyto-hormones.',
        itemCount: 4,
        featured: true,
        order: 2,
        createdAt: new Date(),
      },
      {
        name: 'Chelated Micronutrients',
        slug: 'micronutrients',
        iconName: 'Zap',
        image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38 (2).jpeg',
        description: 'High-availability Zinc, Boron, Iron, Magnesium, and Manganese for correcting crop deficiencies.',
        itemCount: 3,
        featured: true,
        order: 3,
        createdAt: new Date(),
      },
      {
        name: 'Bio-Fungicides & Crop Protectors',
        slug: 'bio-fungicides',
        iconName: 'ShieldCheck',
        image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38.jpeg',
        description: 'Eco-safe botanical and biological agents guarding crops against blast, blight, and root rot.',
        itemCount: 3,
        featured: true,
        order: 4,
        createdAt: new Date(),
      },
      {
        name: 'Soil Conditioners & Humic Formulations',
        slug: 'soil-conditioners',
        iconName: 'Layers',
        image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.39.jpeg',
        description: 'Concentrated potassium humate, fulvic acid, and organic carbon improving soil aeration.',
        itemCount: 3,
        featured: true,
        order: 5,
        createdAt: new Date(),
      },
    ]);
    console.log('Categories seeded.');
  }

  // 4. Seed Products
  const productsCollection = db.collection('products');
  const prodCount = await productsCollection.countDocuments();
  if (prodCount === 0) {
    await productsCollection.insertMany([
      {
        name: 'Sai Bio-Phos (Phosphorus Solubilizing Bio-Fertilizer)',
        slug: 'sai-bio-phos',
        category: 'Bio-Fertilizers & Inoculants',
        subCategory: 'Microbial Inoculant',
        tagline: 'Unlocks fixed soil phosphorus for explosive root proliferation',
        description: 'Sai Bio-Phos is a specialized liquid microbial biofertilizer containing high-density strains of Bacillus megaterium. It solubilizes insoluble organic and inorganic phosphates into plant-available orthophosphate ions, reducing chemical fertilizer dependence by up to 30%.',
        composition: 'Bacillus megaterium (CFU count: 1 x 10^8 cells/ml minimum)',
        targetCrops: ['Paddy', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Potato', 'Vegetables'],
        benefits: [
          'Solubilizes 25-30 kg of fixed soil phosphorus per hectare',
          'Stimulates deeper tap root and secondary feeder root development',
          'Improves seedling vigor and disease resistance',
          '100% eco-friendly and safe for beneficial earthworms',
        ],
        dosageAndApplication: {
          foliarSpray: 'Not recommended for foliar.',
          dripIrrigation: '1 to 2 Litres per acre with regular irrigation water.',
          soilApplication: 'Mix 2 Litres with 100 kg organic manure / FYM and broadcast per acre.',
          seedTreatment: '10-20 ml per kg seed before sowing.',
        },
        packagingSizes: ['500 ml', '1 Litre', '5 Litres', '20 Litres Drum'],
        images: ['/images/products/WhatsApp Image 2026-09-21 at 20.50.37.jpeg'],
        isFeatured: true,
        inStock: true,
        order: 1,
        createdAt: new Date(),
      },
      {
        name: 'Sai Grow-Max (Concentrated Bio-Stimulant & PGR)',
        slug: 'sai-grow-max',
        category: 'Plant Growth Regulators & Promoters',
        subCategory: 'Bio-Stimulant',
        tagline: 'Premium L-Amino acids + Ascophyllum Nodosum Marine Extract',
        description: 'Sai Grow-Max is an advanced bio-stimulant engineered from cold-water seaweed extract fortified with 18 essential free L-amino acids, betaines, and natural cytokinins. It activates chlorophyll synthesis and prevents blossom drop.',
        composition: 'Seaweed Extract 20% w/w, Free Amino Acids 10% w/w, Fulvic Extract 5%',
        targetCrops: ['Chilli', 'Tomato', 'Cotton', 'Paddy', 'Onion', 'Mango', 'Grapes', 'Pomegranate'],
        benefits: [
          'Dramatically reduces flower and young fruit dropping',
          'Enhances photosynthesis rate and leaf canopy expansion',
          'Enhances stress tolerance against drought and extreme heat',
          'Improves fruit uniform size, color, and sugar brix percentage',
        ],
        dosageAndApplication: {
          foliarSpray: '2 to 2.5 ml per litre of water (250-300 ml per acre).',
          dripIrrigation: '500 ml to 1 Litre per acre.',
          soilApplication: 'Mix 1 Litre per acre during early vegetative stage.',
          seedTreatment: '5 ml per kg seed.',
        },
        packagingSizes: ['100 ml', '250 ml', '500 ml', '1 Litre', '5 Litres'],
        images: ['/images/products/WhatsApp Image 2026-09-21 at 20.50.38 (1).jpeg'],
        isFeatured: true,
        inStock: true,
        order: 2,
        createdAt: new Date(),
      },
      {
        name: 'Sai Zinc-Chelate 12% (EDTA Chelated Micronutrient)',
        slug: 'sai-zinc-chelate-12',
        category: 'Chelated Micronutrients',
        subCategory: 'Micronutrient Mixture',
        tagline: '100% Water Soluble EDTA Chelated Zinc for Rapid Foliar Uptake',
        description: 'Sai Zinc-Chelate contains 12% Zinc in full EDTA chelation, preventing rapid precipitation in alkaline soils. Essential for auxin production, stem elongation, and preventing Khaira disease in paddy.',
        composition: 'Chelated Zinc (Zn-EDTA) 12.0% min (w/w)',
        targetCrops: ['Paddy', 'Wheat', 'Maize', 'Sugarcane', 'Citrus', 'Tomato', 'Pulses'],
        benefits: [
          'Immediate absorption through leaf stomata within 3 hours',
          'Prevents and cures Zinc chlorosis (yellowing of younger leaves)',
          'Boosts protein synthesis and enzyme activation',
          'Fully compatible with most non-alkaline bio-fungicides and sprays',
        ],
        dosageAndApplication: {
          foliarSpray: '1.0 to 1.5 grams per litre of water (150-200 grams per acre).',
          dripIrrigation: '500 grams to 1 kg per acre.',
          soilApplication: 'Not recommended for broadcast; use foliar or drip.',
          seedTreatment: 'Not required.',
        },
        packagingSizes: ['250 g', '500 g', '1 Kg', '25 Kg Bag'],
        images: ['/images/products/WhatsApp Image 2026-09-21 at 20.50.38 (2).jpeg'],
        isFeatured: true,
        inStock: true,
        order: 3,
        createdAt: new Date(),
      },
      {
        name: 'Sai Bio-Shield (Trichoderma Viride Bio-Fungicide)',
        slug: 'sai-bio-shield',
        category: 'Bio-Fungicides & Crop Protectors',
        subCategory: 'Biological Antagonist',
        tagline: 'Natural fungal predator controlling soil & seed-borne pathogens',
        description: 'Sai Bio-Shield is a high-potency biological fungicide formulated with Trichoderma viride. Controls Fusarium wilt, root rot, and damping-off through competitive hyperparasitism.',
        composition: 'Trichoderma viride 1% W.P. (CFU: 2 x 10^6 / gm min)',
        targetCrops: ['Chilli', 'Cotton', 'Ginger', 'Turmeric', 'Paddy', 'Pulses', 'Oilseeds'],
        benefits: [
          'Effective eco-friendly control against broad-spectrum fungal diseases',
          'Promotes systemic acquired resistance (SAR) in host plants',
          'Zero chemical residue; completely safe for organic certification',
        ],
        dosageAndApplication: {
          foliarSpray: '5 grams per litre of water during early disease symptoms.',
          dripIrrigation: '1 kg to 2 kg per acre.',
          soilApplication: 'Mix 2.5 kg with 100 kg compost and apply near root zone.',
          seedTreatment: '10 grams per kg seed before planting.',
        },
        packagingSizes: ['500 g', '1 Kg', '5 Kg Bucket', '25 Kg Drum'],
        images: ['/images/products/WhatsApp Image 2026-09-21 at 20.50.38.jpeg'],
        isFeatured: true,
        inStock: true,
        order: 4,
        createdAt: new Date(),
      },
      {
        name: 'Sai Humic-King (98% Potassium Humate + Fulvic + Amino)',
        slug: 'sai-humic-king',
        category: 'Soil Conditioners & Humic Formulations',
        subCategory: 'Organic Soil Rejuvenator',
        tagline: 'Revitalizes degraded soil structure & multiplies beneficial microbes',
        description: 'Sai Humic-King is a premium 100% water-soluble shiny flake formulation derived from high-grade leonardite. Accelerates white root growth and unblocks locked soil nutrients.',
        composition: 'Potassium Humate 80%, Fulvic Acid 15%, K2O 8%, Organic Matter 90%',
        targetCrops: ['All Agricultural, Horticultural, Floricultural, and Cash Crops'],
        benefits: [
          'Multiplies fibrous white root mass by over 40%',
          'Reconditions hard saline and alkaline soils for superior aeration',
          'Increases moisture retention in sandy and arid soils',
        ],
        dosageAndApplication: {
          foliarSpray: '1.5 to 2.0 grams per litre of water.',
          dripIrrigation: '500 grams to 1 kg per acre.',
          soilApplication: '1 to 2 kg per acre mixed with fertilizer/compost.',
          seedTreatment: '5 grams per kg seed.',
        },
        packagingSizes: ['500 g', '1 Kg', '5 Kg', '20 Kg Drum'],
        images: ['/images/products/WhatsApp Image 2026-09-21 at 20.50.39.jpeg'],
        isFeatured: true,
        inStock: true,
        order: 5,
        createdAt: new Date(),
      },
    ]);
    console.log('Products seeded.');
  }

  // 5. Seed Media
  const mediaCollection = db.collection('media');
  const medCount = await mediaCollection.countDocuments();
  if (medCount === 0) {
    await mediaCollection.insertMany([
      {
        title: 'Sai Agro Automated Bio-Formulation & Production Facility Tour',
        type: 'video',
        url: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
        thumbnailUrl: '/images/products/WhatsApp Image 2026-09-21 at 20.50.37.jpeg',
        category: 'Factory Tour',
        description: 'Inside our state-of-the-art automated manufacturing, microbial fermentation reactors, and high-precision packaging lines.',
        featured: true,
        order: 1,
        createdAt: new Date(),
      },
      {
        title: 'High-Yield Agricultural Field Trials & Farmer Demonstration',
        type: 'video',
        url: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
        thumbnailUrl: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38.jpeg',
        category: 'Field Trial',
        description: 'Watch real ground trials showcasing +32% higher crop yield and robust root development.',
        featured: true,
        order: 2,
        createdAt: new Date(),
      },
      {
        title: 'Microbial Quality Control & Research Analytical Lab',
        type: 'image',
        url: '/images/products/WhatsApp Image 2026-09-21 at 21.00.20.jpeg',
        thumbnailUrl: '/images/products/WhatsApp Image 2026-09-21 at 21.00.20.jpeg',
        category: 'Corporate',
        description: 'Our analytical testing lab performing colony counts and pure isolate screening.',
        featured: true,
        order: 3,
        createdAt: new Date(),
      },
    ]);
    console.log('Media items seeded.');
  }

  // 6. Seed Reviews
  const reviewsCollection = db.collection('reviews');
  const revCount = await reviewsCollection.countDocuments();
  if (revCount === 0) {
    await reviewsCollection.insertMany([
      {
        farmerName: 'Rameshwar Patil',
        village: 'Baramati',
        district: 'Pune',
        state: 'Maharashtra',
        cropGrown: 'Sugarcane & Pomegranate',
        productUsed: 'Sai Grow-Max & Sai Humic-King',
        yieldIncreasePercent: '+34%',
        rating: 5,
        reviewText: 'After applying Sai Grow-Max at flowering and Sai Humic-King through drip, my pomegranate orchard had zero fruit cracking and cane weight increased remarkably. Best bio-products in the market!',
        isVerified: true,
        featured: true,
        createdAt: new Date(),
      },
      {
        farmerName: 'Gurpreet Singh Dhillon',
        village: 'Moga',
        district: 'Ludhiana',
        state: 'Punjab',
        cropGrown: 'Paddy & Wheat',
        productUsed: 'Sai Bio-Phos & Sai Zinc-Chelate 12%',
        yieldIncreasePercent: '+28%',
        rating: 5,
        reviewText: 'Khaira disease in my basmati crop disappeared within 4 days of spraying Sai Zinc-Chelate. Grain filling was dense and lustrous. I reduced DAP fertilizer by 25 kg per acre!',
        isVerified: true,
        featured: true,
        createdAt: new Date(),
      },
    ]);
    console.log('Reviews seeded.');
  }

  // 7. Seed Blogs
  const blogsCollection = db.collection('blogs');
  const blogCount = await blogsCollection.countDocuments();
  if (blogCount === 0) {
    await blogsCollection.insertMany([
      {
        title: 'Maximizing Crop Yields with Modern Bio-Fertilizers: The Complete Agronomist Guide',
        slug: 'maximizing-crop-yields-with-bio-fertilizers',
        category: 'Crop Nutrition',
        author: 'Dr. A. K. Verma, Senior Agronomist',
        readTime: '5 min read',
        coverImage: '/images/products/WhatsApp Image 2026-09-21 at 20.50.37.jpeg',
        summary: 'Learn how microbial inoculants unlock soil phosphorus, fix natural nitrogen, and save input costs while rejuvenating organic carbon levels.',
        content: `<h2>Understanding the Power of Microbial Inoculants</h2><p>Modern intensive farming has depleted essential organic matter in soil. Integrating Sai Agro bio-fertilizers into your fertigation schedule guarantees sustained soil health and higher crop profits.</p>`,
        tags: ['Bio-Fertilizers', 'Soil Health', 'Crop Yield'],
        isPublished: true,
        createdAt: new Date(),
      },
    ]);
    console.log('Blogs seeded.');
  }

  console.log('All seeding tasks finished successfully!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
