import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Media from '@/models/Media';
import Blog from '@/models/Blog';
import Review from '@/models/Review';
import Setting from '@/models/Setting';
import { hashPassword } from '@/lib/auth';

export async function GET() {
  return handleSeed();
}

export async function POST() {
  return handleSeed();
}

async function handleSeed() {
  try {
    await connectToDatabase();

    // 1. Seed Default Admin User
    const adminEmail = 'admin@saiagro.com';
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await hashPassword('Admin@123');
      await User.create({
        name: 'Sai Agro Administrator',
        email: adminEmail,
        passwordHash,
        role: 'admin',
      });
      console.log('Default Admin seeded successfully: admin@saiagro.com / Admin@123');
    }

    // 2. Seed Default Settings
    const existingSetting = await Setting.findOne();
    if (!existingSetting) {
      await Setting.create({
        companyName: 'SAI AGRO INDUSTRIES',
        tagline: 'Pioneering Sustainable Agriculture & High-Yield Bio Solutions',
        phonePrimary: '+91 98765 43210',
        phoneSecondary: '+91 91234 56789',
        whatsappNumber: '919876543210',
        emailPrimary: 'info@saiagroindustries.com',
        emailSupport: 'contact@saiagroindustries.com',
        registeredAddress: 'Bela Industrial Area, Phase II, Agro Complex, India',
        factoryAddress: 'Plot No. 12-16, Eco Biotech Zone, Sai Agro Park',
        gstin: '10AAACS9988F1Z9',
        stats: {
          farmersHelped: '50,000+',
          productsDelivered: '1,50,000+',
          statesPresence: '18+ States',
          yieldImprovement: '25-35%',
        },
        socialLinks: {
          facebook: 'https://facebook.com/saiagroindustries',
          youtube: 'https://youtube.com/@saiagroindustries',
          instagram: 'https://instagram.com/saiagroindustries',
          linkedin: 'https://linkedin.com/company/saiagroindustries',
          whatsapp: 'https://wa.me/919876543210',
        },
        heroVideoUrl: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
        heroVideoUrl2: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
      });
    }

    // 3. Seed Categories
    const categoriesCount = await Category.countDocuments();
    if (categoriesCount === 0) {
      const categoriesData = [
        {
          name: 'Bio-Fertilizers & Inoculants',
          slug: 'bio-fertilizers',
          iconName: 'Sprout',
          image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.37.jpeg',
          description: 'Microbial bio-cultures that enhance atmospheric nitrogen fixation and phosphorus solubilization in soil.',
          itemCount: 4,
          order: 1,
        },
        {
          name: 'Plant Growth Regulators & Promoters',
          slug: 'plant-growth-promoters',
          iconName: 'TrendingUp',
          image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38 (1).jpeg',
          description: 'Formulations enriched with amino acids, seaweed extracts, and phyto-hormones for rapid vegetative growth and fruit set.',
          itemCount: 4,
          order: 2,
        },
        {
          name: 'Chelated Micronutrients',
          slug: 'micronutrients',
          iconName: 'Zap',
          image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38 (2).jpeg',
          description: 'High-availability Zinc, Boron, Iron, Magnesium, and Manganese for correcting crop deficiencies rapidly.',
          itemCount: 3,
          order: 3,
        },
        {
          name: 'Bio-Fungicides & Crop Protectors',
          slug: 'bio-fungicides',
          iconName: 'ShieldCheck',
          image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38.jpeg',
          description: 'Eco-safe botanical and biological agents guarding crops against blast, blight, powdery mildew, and root rot.',
          itemCount: 3,
          order: 4,
        },
        {
          name: 'Soil Conditioners & Humic Formulations',
          slug: 'soil-conditioners',
          iconName: 'Layers',
          image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.39.jpeg',
          description: 'Concentrated potassium humate, fulvic acid, and organic carbon improving soil aeration and water retention.',
          itemCount: 3,
          order: 5,
        },
        {
          name: 'Specialty Bio-Granules',
          slug: 'specialty-granules',
          iconName: 'Sparkles',
          image: '/images/products/WhatsApp Image 2026-09-21 at 20.50.40.jpeg',
          description: 'Slow-release organic granules fortified with mycorrhiza and essential secondary nutrients for basal dose.',
          itemCount: 2,
          order: 6,
        },
      ];

      await Category.insertMany(categoriesData);
    }

    // 4. Seed Products
    const productsCount = await Product.countDocuments();
    if (productsCount === 0) {
      const productsData = [
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
        },
        {
          name: 'Sai Grow-Max (Concentrated Bio-Stimulant & PGR)',
          slug: 'sai-grow-max',
          category: 'Plant Growth Regulators & Promoters',
          subCategory: 'Bio-Stimulant',
          tagline: 'Premium L-Amino acids + Ascophyllum Nodosum Marine Extract',
          description: 'Sai Grow-Max is an advanced bio-stimulant engineered from cold-water seaweed extract (Ascophyllum Nodosum) fortified with 18 essential free L-amino acids, betaines, and natural cytokinins. It activates chlorophyll synthesis and prevents blossom drop.',
          composition: 'Seaweed Extract 20% w/w, Free Amino Acids 10% w/w, Fulvic Extract 5%',
          targetCrops: ['Chilli', 'Tomato', 'Cotton', 'Paddy', 'Onion', 'Mango', 'Grapes', 'Pomegranate'],
          benefits: [
            'Dramatically reduces flower and young fruit dropping',
            'Enhances photosynthesis rate and leaf canopy expansion',
            'Enhances stress tolerance against drought, frost, and high heat',
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
        },
        {
          name: 'Sai Bio-Shield (Trichoderma Viride Bio-Fungicide)',
          slug: 'sai-bio-shield',
          category: 'Bio-Fungicides & Crop Protectors',
          subCategory: 'Biological Antagonist',
          tagline: 'Natural fungal predator controlling soil & seed-borne pathogens',
          description: 'Sai Bio-Shield is a high-potency biological fungicide formulated with Trichoderma viride. It controls Fusarium wilt, Rhizoctonia root rot, Pythium damping-off, and Sclerotinia stalk rot through competitive hyperparasitism and chitinase enzyme secretion.',
          composition: 'Trichoderma viride 1% W.P. (CFU: 2 x 10^6 / gm min)',
          targetCrops: ['Chilli', 'Cotton', 'Ginger', 'Turmeric', 'Paddy', 'Pulses', 'Oilseeds'],
          benefits: [
            'Effective eco-friendly control against broad-spectrum fungal diseases',
            'Promotes systemic acquired resistance (SAR) in host plants',
            'Degrades harmful fungal mycelium in soil',
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
        },
        {
          name: 'Sai Humic-King (98% Potassium Humate + Fulvic + Amino)',
          slug: 'sai-humic-king',
          category: 'Soil Conditioners & Humic Formulations',
          subCategory: 'Organic Soil Rejuvenator',
          tagline: 'Revitalizes degraded soil structure & multiplies beneficial microbes',
          description: 'Sai Humic-King is a premium 100% water-soluble shiny flake formulation derived from high-grade leonardite. It accelerates white root growth, increases cation exchange capacity (CEC), and unblocks locked soil nutrients.',
          composition: 'Potassium Humate 80%, Fulvic Acid 15%, K2O 8%, Organic Matter 90%',
          targetCrops: ['All Agricultural, Horticultural, Floricultural, and Cash Crops'],
          benefits: [
            'Multiplies fibrous white root mass by over 40%',
            'Reconditions hard saline and alkaline soils for superior aeration',
            'Increases moisture retention in sandy and arid soils',
            'Chelates micro-nutrients in soil for continuous root feeding',
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
        },
        {
          name: 'Sai Myco-Gold (Endo-Mycorrhizal Bio-Granules)',
          slug: 'sai-myco-gold',
          category: 'Specialty Bio-Granules',
          subCategory: 'Mycorrhizal Soil Inoculant',
          tagline: 'Symbiotic root-extending fungal network for extreme drought resistance',
          description: 'Sai Myco-Gold contains high-titer VAM (Vesicular Arbuscular Mycorrhiza) spores encapsulated in slow-release organic bentonite granules. Extends root surface contact by 100x into microscopic soil pores for water and mineral foraging.',
          composition: 'Glomus intraradices & Glomus mosseae (100 IP/gm min)',
          targetCrops: ['Sugarcane', 'Cotton', 'Banana', 'Wheat', 'Paddy', 'Potato', 'Onion'],
          benefits: [
            'Extends effective root zone absorption area up to 100-fold',
            'Mobilizes zinc, phosphorus, sulfur, and moisture from deep soil layers',
            'Provides remarkable resilience during prolonged dry spells',
            'Suppresses parasitic soil nematodes and soil-borne pathogens',
          ],
          dosageAndApplication: {
            foliarSpray: 'Not applicable (soil application only).',
            dripIrrigation: 'Not applicable for granule form.',
            soilApplication: '4 kg per acre applied during basal or first top dressing.',
            seedTreatment: 'Can be mixed in nursery bed soil.',
          },
          packagingSizes: ['4 Kg Bag', '8 Kg Bag', '25 Kg Bucket', '50 Kg Drum'],
          images: ['/images/products/WhatsApp Image 2026-09-21 at 20.50.40.jpeg'],
          isFeatured: true,
          inStock: true,
          order: 6,
        },
        {
          name: 'Sai Nitro-Fix (Azotobacter Liquid Nitrogen Fixer)',
          slug: 'sai-nitro-fix',
          category: 'Bio-Fertilizers & Inoculants',
          subCategory: 'Bio-Inoculant',
          tagline: 'Captures 20-40 kg atmospheric nitrogen per hectare naturally',
          description: 'Sai Nitro-Fix contains free-living Azotobacter chroococcum bacteria which fix atmospheric nitrogen non-symbiotically while synthesizing auxins, gibberellins, and vitamins that nourish crops throughout their life cycle.',
          composition: 'Azotobacter chroococcum (CFU: 1 x 10^8 cells/ml min)',
          targetCrops: ['Wheat', 'Paddy', 'Maize', 'Mustard', 'Cotton', 'Vegetables', 'Millets'],
          benefits: [
            'Saves up to 25% of synthetic chemical urea application',
            'Produces natural growth-stimulating phytohormones',
            'Improves seed germination percentage and plant stand',
            'Increases organic carbon content of farm soil',
          ],
          dosageAndApplication: {
            foliarSpray: 'Not applicable.',
            dripIrrigation: '1 to 2 Litres per acre.',
            soilApplication: 'Mix 2 Litres with 100 kg farm manure per acre.',
            seedTreatment: '10 ml per kg seed.',
          },
          packagingSizes: ['500 ml', '1 Litre', '5 Litres'],
          images: ['/images/products/WhatsApp Image 2026-09-21 at 20.50.40 (1).jpeg'],
          isFeatured: false,
          inStock: true,
          order: 7,
        },
        {
          name: 'Sai Cal-Bor Plus (Liquid Calcium + Boron Synergy)',
          slug: 'sai-cal-bor-plus',
          category: 'Chelated Micronutrients',
          subCategory: 'Secondary & Micro Fertilizer',
          tagline: 'Stops fruit cracking, blossom-end rot & increases shelf life',
          description: 'Sai Cal-Bor Plus provides fully bio-available Calcium and Boron in optimum stoichiometric balance with poly-hydroxy acid complexing agents. Eliminates hollow heart in potato, tip burn in cabbage, and fruit cracking in pomegranate and tomato.',
          composition: 'Calcium (Ca) 11.0% w/w + Boron (B) 1.5% w/w Liquid formulation',
          targetCrops: ['Tomato', 'Pomegranate', 'Apple', 'Watermelon', 'Potato', 'Cauliflower', 'Grapes'],
          benefits: [
            'Thickens plant cell walls, halting fruit softening and post-harvest decay',
            'Eliminates physiological disorders like blossom end rot',
            'Enhances pollen viability and successful fertilization',
            'Increases crop transit tolerance and export market value',
          ],
          dosageAndApplication: {
            foliarSpray: '2.0 to 2.5 ml per litre of water during flower bud and fruit enlargement stages.',
            dripIrrigation: '1.5 to 2 Litres per acre.',
            soilApplication: 'Apply through fertigation only.',
            seedTreatment: 'Not required.',
          },
          packagingSizes: ['250 ml', '500 ml', '1 Litre', '5 Litres'],
          images: ['/images/products/WhatsApp Image 2026-09-21 at 20.50.41.jpeg'],
          isFeatured: true,
          inStock: true,
          order: 8,
        },
      ];

      await Product.insertMany(productsData);
    }

    // 5. Seed Media Items (Cloudinary videos provided by the user)
    const mediaCount = await Media.countDocuments();
    if (mediaCount === 0) {
      const mediaData = [
        {
          title: 'Sai Agro High-Tech Bio-Formulation & Production Facility Tour',
          type: 'video',
          url: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006013/cfxq9ax4finlluesengh.mp4',
          thumbnailUrl: '/images/products/WhatsApp Image 2026-09-21 at 20.50.37.jpeg',
          category: 'Factory Tour',
          description: 'Take an exclusive inside look into our state-of-the-art automated manufacturing, microbial fermentation reactors, and high-precision packaging lines.',
          featured: true,
          order: 1,
        },
        {
          title: 'Sai Agro High-Yield Field Trials & Farmer Demonstrations',
          type: 'video',
          url: 'https://res.cloudinary.com/dqpbo1uho/video/upload/v1790006093/okb0skw8akivryv3drin.mp4',
          thumbnailUrl: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38.jpeg',
          category: 'Field Trial',
          description: 'Watch real ground trials showcasing +32% higher crop yield, robust root development, and pest resilience on major agricultural crops.',
          featured: true,
          order: 2,
        },
        {
          title: 'Advanced Microbial Quality Testing & In-House Analytical Lab',
          type: 'image',
          url: '/images/products/WhatsApp Image 2026-09-21 at 21.00.20.jpeg',
          thumbnailUrl: '/images/products/WhatsApp Image 2026-09-21 at 21.00.20.jpeg',
          category: 'Corporate',
          description: 'Our certified R&D laboratory carrying out strict batch-to-batch colony count verification and contaminant screening.',
          featured: true,
          order: 3,
        },
      ];

      await Media.insertMany(mediaData);
    }

    // 6. Seed Farmer Reviews
    const reviewsCount = await Review.countDocuments();
    if (reviewsCount === 0) {
      const reviewsData = [
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
          farmerPhoto: '',
          isVerified: true,
          featured: true,
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
          farmerPhoto: '',
          isVerified: true,
          featured: true,
        },
        {
          farmerName: 'Sunil Kumar Sharma',
          village: 'Kanti',
          district: 'Muzaffarpur',
          state: 'Bihar',
          cropGrown: 'Tomato, Chilli & Maize',
          productUsed: 'Sai Bio-Shield & Sai Myco-Gold',
          yieldIncreasePercent: '+30%',
          rating: 5,
          reviewText: 'Wilting and root rot in my tomato field was stopped completely by Sai Bio-Shield. The plant vigor and continuous fruiting gave me the highest market returns this season.',
          farmerPhoto: '',
          isVerified: true,
          featured: true,
        },
      ];

      await Review.insertMany(reviewsData);
    }

    // 7. Seed Agricultural Knowledge Blogs
    const blogsCount = await Blog.countDocuments();
    if (blogsCount === 0) {
      const blogsData = [
        {
          title: 'Maximizing Crop Yields with Modern Bio-Fertilizers: The Complete Agronomist Guide',
          slug: 'maximizing-crop-yields-with-bio-fertilizers',
          category: 'Crop Nutrition',
          author: 'Dr. A. K. Verma, Senior Agronomist',
          readTime: '5 min read',
          coverImage: '/images/products/WhatsApp Image 2026-09-21 at 20.50.37.jpeg',
          summary: 'Learn how microbial inoculants unlock soil phosphorus, fix natural nitrogen, and save input costs while rejuvenating organic carbon levels in agricultural land.',
          content: `
            <h2>Understanding the Power of Microbial Inoculants</h2>
            <p>Modern intensive farming has depleted essential organic matter and beneficial microflora in soil. Continuous chemical fertilizing often leads to nutrient lockup—where up to 75% of applied phosphorus becomes fixed and unavailable to roots.</p>
            <h3>How Bio-Fertilizers Solve the Problem</h3>
            <ul>
              <li><strong>Phosphorus Solubilizing Bacteria (PSB):</strong> Strains like Bacillus megaterium secrete organic acids that solubilize fixed phosphates.</li>
              <li><strong>Nitrogen Fixers:</strong> Azotobacter and Rhizobium harness free atmospheric nitrogen into plant-accessible nitrates.</li>
              <li><strong>VAM Mycorrhiza:</strong> Extends the effective root surface area by up to 100 times.</li>
            </ul>
            <p>Integrating Sai Agro bio-fertilizers into your basal and fertigation schedules guarantees sustained soil health and higher crop profits year after year.</p>
          `,
          tags: ['Bio-Fertilizers', 'Soil Health', 'Crop Yield', 'Sustainable Farming'],
          isPublished: true,
        },
        {
          title: 'Preventing Flower & Fruit Dropping in Horticultural Crops: Causes and Solutions',
          slug: 'preventing-flower-and-fruit-dropping',
          category: 'Modern Farming',
          author: 'Sai Agro Technical Advisory',
          readTime: '4 min read',
          coverImage: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38 (1).jpeg',
          summary: 'Discover the critical hormonal and micronutrient imbalances causing blossom drop and how seaweed-based bio-stimulants preserve fruit set.',
          content: `
            <h2>Why Do Flowers and Young Fruits Drop?</h2>
            <p>Flower and fruit abortion in tomato, chilli, pomegranate, mango, and cotton typically occurs due to severe temperature fluctuations, water stress, or deficiency of Boron, Calcium, and Auxin hormones.</p>
            <h3>Action Plan for 100% Fruit Setting</h3>
            <ol>
              <li>Foliar spray of <strong>Sai Grow-Max</strong> (Seaweed + Amino Acids) at flower initiation stage.</li>
              <li>Secondary spray of <strong>Sai Cal-Bor Plus</strong> during petal fall and pea-stage fruit enlargement.</li>
              <li>Maintain uniform soil moisture without waterlogging the root zone.</li>
            </ol>
          `,
          tags: ['Horticulture', 'Plant Growth', 'Fruit Setting', 'Bio-Stimulants'],
          isPublished: true,
        },
        {
          title: 'Eco-Friendly Disease Defense: Managing Fungal Blights Without Toxic Residue',
          slug: 'eco-friendly-fungal-disease-defense',
          category: 'Bio-Pest Control',
          author: 'Agronomy Research Wing',
          readTime: '6 min read',
          coverImage: '/images/products/WhatsApp Image 2026-09-21 at 20.50.38.jpeg',
          summary: 'A biological blueprint for controlling damping-off, root rot, and foliar blights using beneficial fungal antagonists like Trichoderma viride.',
          content: `
            <h2>The Shift Toward Residue-Free Crop Protection</h2>
            <p>With increasing export quality standards and farmer safety priorities, biological fungicides like Trichoderma viride offer superior prophylactic protection by parasitizing pathogenic mycelium.</p>
            <p>Combined with organic soil conditioning from Sai Humic-King, crops build thick cell walls that resist pathogen puncture and environmental stress.</p>
          `,
          tags: ['Bio-Fungicide', 'Crop Protection', 'Trichoderma', 'Organic Farming'],
          isPublished: true,
        },
      ];

      await Blog.insertMany(blogsData);
    }

    return NextResponse.json({
      success: true,
      message: 'Sai Agro Industries Database seeded successfully with default admin, products, categories, media, reviews, and blogs!',
      adminCredentials: {
        email: 'admin@saiagro.com',
        password: 'Admin@123',
        loginUrl: '/admin/login',
      },
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
