const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://triptisinghh897_db_user:z5G4j5HbW2WPv7Su@cluster0.rdov0aq.mongodb.net/sai_agro?retryWrites=true&w=majority';

const productImagesMapping = {
  'sai-bio-phos': ['/images/products/sai-bio-phos.jpg', '/images/products/product-1.jpg'],
  'sai-grow-max': ['/images/products/sai-grow-max.jpg', '/images/products/product-2.jpg', '/images/products/sai-agro-banner.jpg'],
  'sai-zinc-chelate-12': ['/images/products/sai-zinc-chelate.jpg', '/images/products/product-3.jpg'],
  'sai-zinc-chelate': ['/images/products/sai-zinc-chelate.jpg', '/images/products/product-3.jpg'],
  'sai-bio-shield': ['/images/products/sai-bio-shield.jpg', '/images/products/product-4.jpg'],
  'sai-humic-king': ['/images/products/sai-humic-king.jpg', '/images/products/product-5.jpg'],
  'sai-myco-gold': ['/images/products/sai-myco-gold.jpg', '/images/products/product-6.jpg'],
  'sai-npk-consortia': ['/images/products/sai-npk-consortia.jpg', '/images/products/product-7.jpg'],
  'sai-amino-plus': ['/images/products/sai-amino-plus.jpg', '/images/products/product-8.jpg'],
  'sai-cal-mag-boron': ['/images/products/sai-cal-mag-boron.jpg', '/images/products/product-9.jpg'],
  'sai-pseudomonas': ['/images/products/sai-pseudomonas.jpg', '/images/products/product-10.jpg'],
  'sai-fulvic-power': ['/images/products/sai-fulvic-power.jpg', '/images/products/product-11.jpg'],
  'sai-seaweed-supreme': ['/images/products/sai-seaweed-supreme.jpg', '/images/products/product-12.jpg'],
  'sai-potash-activator': ['/images/products/sai-potash-activator.jpg', '/images/products/product-13.jpg'],
  'sai-boron-special': ['/images/products/sai-boron-special.jpg', '/images/products/product-14.jpg'],
};

const categoryImagesMapping = {
  'bio-fertilizers': '/images/products/sai-bio-phos.jpg',
  'plant-growth-promoters': '/images/products/sai-grow-max.jpg',
  'micronutrients': '/images/products/sai-zinc-chelate.jpg',
  'bio-fungicides': '/images/products/sai-bio-shield.jpg',
  'soil-conditioners': '/images/products/sai-humic-king.jpg',
  'specialty-granules': '/images/products/sai-myco-gold.jpg',
  'specialty-bio-granules': '/images/products/sai-myco-gold.jpg',
};

async function updateImages() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected.');

    const db = mongoose.connection.db;
    const productsCollection = db.collection('products');
    const categoriesCollection = db.collection('categories');

    // Update Products
    const products = await productsCollection.find({}).toArray();
    console.log(`Found ${products.length} products in DB.`);

    let index = 1;
    for (const prod of products) {
      const slug = prod.slug || '';
      const mapped = productImagesMapping[slug] || [
        `/images/products/product-${index}.jpg`,
        `/images/products/sai-grow-max.jpg`
      ];

      await productsCollection.updateOne(
        { _id: prod._id },
        { $set: { images: mapped, inStock: true } }
      );
      console.log(`Updated product: ${prod.name} -> ${mapped[0]}`);
      index = (index % 15) + 1;
    }

    // Update Categories
    const categories = await categoriesCollection.find({}).toArray();
    for (const cat of categories) {
      const slug = cat.slug || '';
      const catImage = categoryImagesMapping[slug] || '/images/products/sai-grow-max.jpg';
      await categoriesCollection.updateOne(
        { _id: cat._id },
        { $set: { image: catImage } }
      );
      console.log(`Updated category: ${cat.name} -> ${catImage}`);
    }

    console.log('Product & category images updated successfully in MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating images:', err);
    process.exit(1);
  }
}

updateImages();
