const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://triptisinghh897_db_user:z5G4j5HbW2WPv7Su@cluster0.rdov0aq.mongodb.net/sai_agro?retryWrites=true&w=majority';

async function seedAll() {
  try {
    console.log('Connecting to MongoDB Atlas (sai_agro)...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    const db = mongoose.connection.db;

    // 1. Seed/Update Admin
    const users = db.collection('users');
    const existingAdmin = await users.findOne({ email: 'admin@saiagro.com' });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Admin@123', 10);
      await users.insertOne({
        name: 'Sai Agro Administrator',
        email: 'admin@saiagro.com',
        passwordHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Admin user created: admin@saiagro.com / Admin@123');
    }

    // 2. Seed/Update Settings
    const settings = db.collection('settings');
    await settings.deleteMany({});
    await settings.insertOne({
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
        yieldImprovement: '25-35%'
      },
      heroVideoUrl: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
      heroVideoUrl2: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Settings updated.');

    // 3. Seed/Update Categories with real product image assets
    const categories = db.collection('categories');
    await categories.deleteMany({});
    await categories.insertMany([
      {
        name: 'Bio-Fertilizers & Inoculants',
        slug: 'bio-fertilizers',
        iconName: 'Sprout',
        image: '/images/products/sai-bio-phos.jpg',
        description: 'Microbial bio-cultures that enhance atmospheric nitrogen fixation and phosphorus solubilization.',
        itemCount: 4,
        featured: true,
        order: 1,
        createdAt: new Date()
      },
      {
        name: 'Plant Growth Regulators & Promoters',
        slug: 'plant-growth-promoters',
        iconName: 'TrendingUp',
        image: '/images/products/sai-grow-max.jpg',
        description: 'Formulations enriched with amino acids, seaweed extracts, and phyto-hormones.',
        itemCount: 4,
        featured: true,
        order: 2,
        createdAt: new Date()
      },
      {
        name: 'Chelated Micronutrients',
        slug: 'micronutrients',
        iconName: 'Zap',
        image: '/images/products/sai-zinc-chelate.jpg',
        description: 'High-availability Zinc, Boron, Iron, Magnesium, and Manganese for correcting crop deficiencies.',
        itemCount: 3,
        featured: true,
        order: 3,
        createdAt: new Date()
      },
      {
        name: 'Bio-Fungicides & Crop Protectors',
        slug: 'bio-fungicides',
        iconName: 'ShieldCheck',
        image: '/images/products/sai-bio-shield.jpg',
        description: 'Biological control agents protecting crops against Fusarium wilt, root rot, and blight.',
        itemCount: 3,
        featured: true,
        order: 4,
        createdAt: new Date()
      },
      {
        name: 'Soil Conditioners & Humic Formulations',
        slug: 'soil-conditioners',
        iconName: 'Layers',
        image: '/images/products/sai-humic-king.jpg',
        description: 'Potassium humate flakes and fulvic acid improving soil aeration and white root development.',
        itemCount: 3,
        featured: true,
        order: 5,
        createdAt: new Date()
      },
      {
        name: 'Specialty Bio-Granules',
        slug: 'specialty-granules',
        iconName: 'Sparkles',
        image: '/images/products/sai-myco-gold.jpg',
        description: 'Encapsulated mycorrhizal bio-granules extending root surface absorption by up to 100x.',
        itemCount: 3,
        featured: true,
        order: 6,
        createdAt: new Date()
      }
    ]);
    console.log('Categories seeded.');

    // 4. Seed/Update Products with ALL 15 Real Assets
    const products = db.collection('products');
    await products.deleteMany({});
    await products.insertMany([
      {
        name: 'Sai Bio-Phos (Phosphorus Solubilizing Bio-Fertilizer)',
        slug: 'sai-bio-phos',
        category: 'Bio-Fertilizers & Inoculants',
        subCategory: 'Microbial Inoculant',
        tagline: 'Unlocks fixed soil phosphorus for explosive root proliferation',
        description: 'Sai Bio-Phos is a specialized liquid microbial biofertilizer containing high-density strains of Bacillus megaterium. It solubilizes insoluble organic and inorganic phosphates into plant-available orthophosphate ions, saving synthetic DAP expenses by up to 30%.',
        composition: 'Bacillus megaterium (CFU count: 1 x 10^9 cells/ml minimum)',
        targetCrops: ['Paddy', 'Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Potato', 'Vegetables'],
        benefits: [
          'Solubilizes 25-30 kg of fixed soil phosphorus per hectare naturally',
          'Stimulates deeper tap root and secondary feeder root development',
          'Improves seedling vigor and disease resistance',
          '100% eco-friendly and safe for soil ecology'
        ],
        dosageAndApplication: {
          foliarSpray: 'Not recommended for foliar.',
          dripIrrigation: '1 to 2 Litres per acre with regular irrigation water.',
          soilApplication: 'Mix 2 Litres with 100 kg organic manure / FYM and broadcast per acre.',
          seedTreatment: '10-20 ml per kg seed before sowing.'
        },
        packagingSizes: ['500 ml', '1 Litre', '5 Litres', '20 Litres Drum'],
        images: ['/images/products/sai-bio-phos.jpg', '/images/products/product-1.jpg'],
        isFeatured: true,
        inStock: true,
        order: 1,
        createdAt: new Date()
      },
      {
        name: 'Sai Grow-Max (Concentrated Bio-Stimulant & PGR)',
        slug: 'sai-grow-max',
        category: 'Plant Growth Regulators & Promoters',
        subCategory: 'Bio-Stimulant',
        tagline: 'Premium L-Amino acids + Ascophyllum Nodosum Marine Seaweed Extract',
        description: 'Sai Grow-Max is an advanced bio-stimulant engineered from cold-water seaweed extract (Ascophyllum Nodosum) fortified with 18 essential free L-amino acids, betaines, and natural cytokinins. It activates chlorophyll synthesis and prevents blossom/fruit drop.',
        composition: 'Seaweed Extract 20% w/w, Free Amino Acids 10% w/w, Fulvic Extract 5%',
        targetCrops: ['Chilli', 'Tomato', 'Cotton', 'Paddy', 'Onion', 'Mango', 'Grapes', 'Pomegranate'],
        benefits: [
          'Dramatically reduces flower and young fruit dropping',
          'Enhances photosynthesis rate and leaf canopy expansion',
          'Enhances stress tolerance against drought, frost, and high heat',
          'Improves fruit uniform size, color, and sugar brix percentage'
        ],
        dosageAndApplication: {
          foliarSpray: '2 to 2.5 ml per litre of water (250-300 ml per acre).',
          dripIrrigation: '500 ml to 1 Litre per acre.',
          soilApplication: 'Mix 1 Litre per acre during early vegetative stage.',
          seedTreatment: '5 ml per kg seed.'
        },
        packagingSizes: ['100 ml', '250 ml', '500 ml', '1 Litre', '5 Litres'],
        images: ['/images/products/sai-grow-max.jpg', '/images/products/product-2.jpg', '/images/products/sai-agro-banner.jpg'],
        isFeatured: true,
        inStock: true,
        order: 2,
        createdAt: new Date()
      },
      {
        name: 'Sai Zinc-Chelate 12% (EDTA Chelated Micronutrient)',
        slug: 'sai-zinc-chelate-12',
        category: 'Chelated Micronutrients',
        subCategory: 'Micronutrient Mixture',
        tagline: '100% Water Soluble EDTA Chelated Zinc for Rapid Foliar Uptake',
        description: 'Sai Zinc-Chelate contains 12% Zinc in full EDTA chelation, preventing rapid precipitation in alkaline soils. Essential for auxin production, stem elongation, and preventing Khaira disease in paddy and little-leaf disorders in fruit crops.',
        composition: 'Chelated Zinc (Zn-EDTA) 12.0% min (w/w)',
        targetCrops: ['Paddy', 'Wheat', 'Maize', 'Sugarcane', 'Citrus', 'Tomato', 'Pulses'],
        benefits: [
          'Immediate absorption through leaf stomata within 3 hours',
          'Prevents and cures Zinc chlorosis (yellowing of younger leaves)',
          'Boosts protein synthesis and enzyme activation',
          'Fully compatible with most non-alkaline bio-fungicides and sprays'
        ],
        dosageAndApplication: {
          foliarSpray: '1.0 to 1.5 grams per litre of water (150-200 grams per acre).',
          dripIrrigation: '500 grams to 1 kg per acre.',
          soilApplication: 'Not recommended for broadcast; use foliar or drip.',
          seedTreatment: 'Not required.'
        },
        packagingSizes: ['250 g', '500 g', '1 Kg', '25 Kg Bag'],
        images: ['/images/products/sai-zinc-chelate.jpg', '/images/products/product-3.jpg'],
        isFeatured: true,
        inStock: true,
        order: 3,
        createdAt: new Date()
      },
      {
        name: 'Sai Bio-Shield (Trichoderma Viride Bio-Fungicide)',
        slug: 'sai-bio-shield',
        category: 'Bio-Fungicides & Crop Protectors',
        subCategory: 'Biological Fungicide',
        tagline: 'Eco-friendly fungal antagonist against root rot, wilt, and damping-off',
        description: 'Sai Bio-Shield is a high-grade bio-fungicide containing active spores of Trichoderma viride. It secretes chitinase and glucanase enzymes that destroy pathogenic fungal hyphae and colonizes the rhizosphere to block root rot and wilt.',
        composition: 'Trichoderma viride 1.5% W.P. (CFU count: 2 x 10^6 spores/gm minimum)',
        targetCrops: ['Cotton', 'Chilli', 'Paddy', 'Sugarcane', 'Ginger', 'Turmeric', 'Vegetables'],
        benefits: [
          'Guards against Fusarium wilt, Pythium damping-off, and Rhizoctonia root rot',
          'Establishes long-lasting biological barrier around the root zone',
          'Produces systemic acquired resistance (SAR) in plants',
          '100% organic, zero chemical residue, eco-safe'
        ],
        dosageAndApplication: {
          foliarSpray: '4 to 5 grams per litre of water on first sign of leaf spots.',
          dripIrrigation: '1 kg to 2 kg per acre.',
          soilApplication: 'Mix 2.5 kg with 100 kg farm manure, incubate 7 days, and broadcast per acre.',
          seedTreatment: '10 grams per kg seed before planting.'
        },
        packagingSizes: ['500 g', '1 Kg', '5 Kg Bucket', '25 Kg Drum'],
        images: ['/images/products/sai-bio-shield.jpg', '/images/products/product-4.jpg'],
        isFeatured: true,
        inStock: true,
        order: 4,
        createdAt: new Date()
      },
      {
        name: 'Sai Humic-King (98% Potassium Humate Shiny Flakes)',
        slug: 'sai-humic-king',
        category: 'Soil Conditioners & Humic Formulations',
        subCategory: 'Soil Conditioner',
        tagline: 'Super-grade shiny humic flakes for white root multiplication & soil aeration',
        description: 'Sai Humic-King is 100% water-soluble shiny humate flakes extracted from premium leonardite. It neutralizes alkaline soils, improves nutrient cation exchange capacity (CEC), and stimulates white feeder root mass up to 3x.',
        composition: 'Potassium Humate 98% (Humic Acid 70% + Fulvic Acid 15% + K2O 10%)',
        targetCrops: ['All Crops', 'Paddy', 'Sugarcane', 'Wheat', 'Potato', 'Vegetables', 'Fruit Orchards'],
        benefits: [
          'Increases soil water holding capacity and buffers against drought stress',
          'Multiplies white root mass and mycorrhizal colonization',
          'Unlocks bound soil micronutrients (Iron, Zinc, Calcium) for easy plant uptake',
          'Conditioning hard compacted soil into loose, crumbly fertile earth'
        ],
        dosageAndApplication: {
          foliarSpray: '1.0 to 1.5 grams per litre of water during vegetative growth.',
          dripIrrigation: '500 grams to 1 kg per acre through drip irrigation.',
          soilApplication: 'Mix 1 to 2 kg per acre with compost or basal fertilizers.',
          seedTreatment: '5 grams per kg seed for improved germination.'
        },
        packagingSizes: ['500 g', '1 Kg', '5 Kg Bucket', '25 Kg Drum'],
        images: ['/images/products/sai-humic-king.jpg', '/images/products/product-5.jpg'],
        isFeatured: true,
        inStock: true,
        order: 5,
        createdAt: new Date()
      },
      {
        name: 'Sai Myco-Gold (VAM Mycorrhizal Bio-Granules)',
        slug: 'sai-myco-gold',
        category: 'Specialty Bio-Granules',
        subCategory: 'Mycorrhizal Inoculant',
        tagline: 'Live Endo-Mycorrhiza Granules for 100x Root Absorption Network',
        description: 'Sai Myco-Gold contains live Vesicular Arbuscular Mycorrhiza (VAM) spores encapsulated in organic bentonite granules. It forms symbiotic fungal hyphae that extend deep into soil micropores to mine water and immobile phosphorus.',
        composition: 'Vesicular Arbuscular Mycorrhiza (100 IP/gm) with organic humate carrier',
        targetCrops: ['Wheat', 'Sugarcane', 'Cotton', 'Maize', 'Soybean', 'Horticulture & Fruit Orchards'],
        benefits: [
          'Expands root surface area up to 100 times into deeper soil strata',
          'Enhances uptake of immobile nutrients like Phosphorus, Zinc, and Boron',
          'Increases crop drought resistance and tolerance to salinity',
          'Reduces chemical fertilizer loss from leaching by 20-30%'
        ],
        dosageAndApplication: {
          foliarSpray: 'Not applicable (Granular soil formulation).',
          dripIrrigation: 'Not applicable (Granular formulation).',
          soilApplication: '4 kg per acre mixed with basal fertilizer or compost at sowing/planting time.',
          seedTreatment: 'Not required.'
        },
        packagingSizes: ['4 Kg Bag', '8 Kg Bucket', '25 Kg Drum'],
        images: ['/images/products/sai-myco-gold.jpg', '/images/products/product-6.jpg'],
        isFeatured: true,
        inStock: true,
        order: 6,
        createdAt: new Date()
      },
      {
        name: 'Sai NPK Consortia (Liquid Bio-NPK Inoculant)',
        slug: 'sai-npk-consortia',
        category: 'Bio-Fertilizers & Inoculants',
        subCategory: 'Consortium Inoculant',
        tagline: 'Complete 3-in-1 Nitrogen, Phosphorus & Potash Bio-Mobilizer',
        description: 'A synergistic liquid blend of Azotobacter (Nitrogen fixing), Bacillus megaterium (Phosphorus solubilizing), and Frateuria aurantia (Potash mobilizing) providing comprehensive nutrient bio-availability.',
        composition: 'Azotobacter + PSB + KMB consortium (Total CFU count: 3 x 10^9 cells/ml)',
        targetCrops: ['Sugarcane', 'Banana', 'Paddy', 'Wheat', 'Maize', 'Vegetables'],
        benefits: [
          'Fixes 30-40 kg atmospheric Nitrogen per hectare',
          'Solubilizes 25-30 kg unavailable soil Phosphate',
          'Mobilizes 20-25 kg soil Potash',
          'Cuts total NPK fertilizer cost by 25%'
        ],
        dosageAndApplication: {
          foliarSpray: 'Not recommended.',
          dripIrrigation: '1 to 2 Litres per acre.',
          soilApplication: 'Mix 2 Litres with compost and broadcast per acre.',
          seedTreatment: '20 ml per kg seed.'
        },
        packagingSizes: ['1 Litre', '5 Litres', '20 Litres'],
        images: ['/images/products/sai-npk-consortia.jpg', '/images/products/product-7.jpg'],
        isFeatured: false,
        inStock: true,
        order: 7,
        createdAt: new Date()
      },
      {
        name: 'Sai Amino-Plus (Bio-Active L-Amino Acid Stimulant)',
        slug: 'sai-amino-plus',
        category: 'Plant Growth Regulators & Promoters',
        subCategory: 'Amino Acid Stimulant',
        tagline: '18 Essential Free Plant Amino Acids for Rapid Vegetative Growth',
        description: 'Enzymatic protein hydrolysate delivering 18 pure L-alpha amino acids that bypass metabolic synthesis steps, directly accelerating protein synthesis and plant recovery from chemical or weather stress.',
        composition: 'Total Free L-Amino Acids 50% w/w, Organic Nitrogen 8%',
        targetCrops: ['Chilli', 'Tomato', 'Potato', 'Onion', 'Pomegranate', 'Grapes', 'Cotton'],
        benefits: [
          'Accelerates shoot elongation and new leaf sprouting',
          'Enhances stomatal opening and transpiration regulation',
          'Chelates micronutrients naturally for faster cellular uptake',
          'Helps crops rebound immediately after pesticide spray shock'
        ],
        dosageAndApplication: {
          foliarSpray: '1.5 to 2 ml per litre of water.',
          dripIrrigation: '500 ml per acre.',
          soilApplication: 'Mix 1 Litre with fertigation water.',
          seedTreatment: '5 ml per kg seed.'
        },
        packagingSizes: ['250 ml', '500 ml', '1 Litre', '5 Litres'],
        images: ['/images/products/sai-amino-plus.jpg', '/images/products/product-8.jpg'],
        isFeatured: false,
        inStock: true,
        order: 8,
        createdAt: new Date()
      },
      {
        name: 'Sai Cal-Mag-Boron (Chelated Secondary Nutrients)',
        slug: 'sai-cal-mag-boron',
        category: 'Chelated Micronutrients',
        subCategory: 'Secondary Nutrients',
        tagline: 'Triple-Action Formula for Cell Wall Strength & Pollen Viability',
        description: 'Specialized liquid chelated formulation of Calcium, Magnesium, and Boron preventing blossom end rot in tomatoes, fruit cracking in pomegranate, and empty pod disorder in pulses.',
        composition: 'Calcium (Ca) 10%, Magnesium (Mg) 2%, Boron (B) 1.5% in organic chelation',
        targetCrops: ['Tomato', 'Chilli', 'Pomegranate', 'Apple', 'Watermelon', 'Pulses'],
        benefits: [
          'Prevents fruit cracking and blossom end rot',
          'Strengthens cell walls for extended produce shelf life',
          'Enhances pollen germination and fruit set percentage',
          'Maintains rich green foliage through active chlorophyll magnesium core'
        ],
        dosageAndApplication: {
          foliarSpray: '2 to 2.5 ml per litre of water at flowering and fruit development.',
          dripIrrigation: '1 Litre per acre.',
          soilApplication: 'Not recommended.',
          seedTreatment: 'Not required.'
        },
        packagingSizes: ['500 ml', '1 Litre', '5 Litres'],
        images: ['/images/products/sai-cal-mag-boron.jpg', '/images/products/product-9.jpg'],
        isFeatured: false,
        inStock: true,
        order: 9,
        createdAt: new Date()
      },
      {
        name: 'Sai Pseudomonas (Fluorescens Bio-Bactericide)',
        slug: 'sai-pseudomonas',
        category: 'Bio-Fungicides & Crop Protectors',
        subCategory: 'Bio-Bactericide',
        tagline: 'Multi-Action Bio-Bactericide & Growth Promoting Rhizobacteria (PGPR)',
        description: 'Contains virulent strains of Pseudomonas fluorescens producing pyrrolnitrin and phenazine antibiotics that suppress bacterial leaf blight, sheath rot, and fungal root infections while stimulating root auxins.',
        composition: 'Pseudomonas fluorescens 1.5% W.P. (CFU count: 2 x 10^8 cells/gm min)',
        targetCrops: ['Paddy', 'Chilli', 'Tomato', 'Cabbage', 'Ginger', 'Banana', 'Pulses'],
        benefits: [
          'Controls Bacterial Leaf Blight (BLB) in Paddy and bacterial spot in vegetables',
          'Produces siderophores that starve soil pathogens of iron',
          'Induces systemic disease immunity across entire crop canopy',
          'Promotes vigorous early vegetative branching'
        ],
        dosageAndApplication: {
          foliarSpray: '5 grams per litre of water.',
          dripIrrigation: '1 to 2 kg per acre.',
          soilApplication: 'Mix 2.5 kg with 100 kg compost and apply per acre.',
          seedTreatment: '10 grams per kg seed.'
        },
        packagingSizes: ['500 g', '1 Kg', '25 Kg Drum'],
        images: ['/images/products/sai-pseudomonas.jpg', '/images/products/product-10.jpg'],
        isFeatured: false,
        inStock: true,
        order: 10,
        createdAt: new Date()
      },
      {
        name: 'Sai Fulvic-Power (High-Purity Bio-Fulvic Acid)',
        slug: 'sai-fulvic-power',
        category: 'Soil Conditioners & Humic Formulations',
        subCategory: 'Fulvic Bio-Nutrient',
        tagline: 'Low Molecular Weight Fulvic Acid for Instant Nutrient Penetration',
        description: 'Concentrated natural fulvic acid solution capable of penetrating cell membranes instantly. Acts as the ultimate natural chelator and carrier for all foliar sprays and fertilizers.',
        composition: 'Active Bio-Fulvic Acid 80% w/w',
        targetCrops: ['All Field & Horticultural Crops'],
        benefits: [
          'Carries spray nutrients directly into plant cells within minutes',
          'Enhances enzyme metabolism and respiration',
          'Improves crop resilience against salinity and chemical toxicity',
          'Compatible with 100% of organic and bio-inputs'
        ],
        dosageAndApplication: {
          foliarSpray: '1.0 to 1.5 ml per litre of water.',
          dripIrrigation: '500 ml per acre.',
          soilApplication: 'Mix 1 Litre with irrigation water.',
          seedTreatment: '5 ml per kg seed.'
        },
        packagingSizes: ['250 ml', '500 ml', '1 Litre'],
        images: ['/images/products/sai-fulvic-power.jpg', '/images/products/product-11.jpg'],
        isFeatured: false,
        inStock: true,
        order: 11,
        createdAt: new Date()
      },
      {
        name: 'Sai Seaweed-Supreme (Ascophyllum Nodosum Pure Flakes)',
        slug: 'sai-seaweed-supreme',
        category: 'Plant Growth Regulators & Promoters',
        subCategory: 'Marine Bio-Stimulant',
        tagline: '100% Soluble Cold-Extracted Seaweed Extract Flakes',
        description: 'Pure soluble black seaweed flakes harvested from the pristine cold waters of the North Atlantic. Rich in natural alginic acid, betaines, cytokinins, and over 60 chelated trace minerals.',
        composition: 'Soluble Seaweed Extract (Ascophyllum Nodosum) 100%, Alginic Acid 16%, Organic Matter 50%',
        targetCrops: ['Chilli', 'Cotton', 'Paddy', 'Grapes', 'Pomegranate', 'Vegetables', 'Cardamom', 'Tea'],
        benefits: [
          'Maximizes flower density and reduces pre-harvest fruit shedding',
          'Enhances chlorophyll index and leaf thickness',
          'Promotes natural defense against pest thrips and mites',
          'Improves crop yield by 20% to 35% with superior quality grading'
        ],
        dosageAndApplication: {
          foliarSpray: '0.75 to 1 gram per litre of water (100-150g per acre).',
          dripIrrigation: '250 to 500 grams per acre.',
          soilApplication: 'Mix 500 grams with compost at basal application.',
          seedTreatment: '2 grams per kg seed.'
        },
        packagingSizes: ['100 g', '250 g', '500 g', '1 Kg', '20 Kg Box'],
        images: ['/images/products/sai-seaweed-supreme.jpg', '/images/products/product-12.jpg'],
        isFeatured: true,
        inStock: true,
        order: 12,
        createdAt: new Date()
      }
    ]);
    console.log('All 12+ flagships products seeded with real assets!');

    console.log('Database seeding and asset mapping complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedAll();
