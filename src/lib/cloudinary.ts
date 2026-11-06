import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'offymy0e',
  api_key: process.env.CLOUDINARY_API_KEY || '788968341468666',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'FkHMcJlFjrN3SeQShPZf1x2k5zs',
  secure: true,
});

export default cloudinary;

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  folder: string = 'sai_agro',
  resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto'
): Promise<{ url: string; public_id: string; secure_url: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve({
              url: result.url,
              public_id: result.public_id,
              secure_url: result.secure_url,
            });
          } else {
            reject(new Error('Unknown upload error occurred'));
          }
        }
      )
      .end(fileBuffer);
  });
}
