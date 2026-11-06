import mongoose from 'mongoose';

function getSanitizedMongoUri(rawUri?: string): string {
  const defaultUri = 'mongodb+srv://triptisinghh897_db_user:z5G4j5HbW2WPv7Su@cluster0.rdov0aq.mongodb.net/sai_agro?retryWrites=true&w=majority';
  if (!rawUri) return defaultUri;
  
  let clean = rawUri.trim();
  // Automatically fix spaces in database name (e.g. /SAI AGRO -> /sai_agro)
  if (clean.includes('/SAI AGRO') || clean.includes('/SAI%20AGRO')) {
    clean = clean.replace(/\/SAI(%20|\s+)AGRO/gi, '/sai_agro');
  }
  return clean;
}

const MONGODB_URI = getSanitizedMongoUri(process.env.MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    const targetUri = getSanitizedMongoUri(process.env.MONGODB_URI);
    cached.promise = mongoose.connect(targetUri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
