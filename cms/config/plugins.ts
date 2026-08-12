export default ({ env }) => ({
  upload: {
    config: env('CLOUDINARY_NAME') ? {
      provider: 'cloudinary',
      providerOptions: { cloud_name: env('CLOUDINARY_NAME'), api_key: env('CLOUDINARY_KEY'), api_secret: env('CLOUDINARY_SECRET') },
      actionOptions: { upload: {}, uploadStream: {}, delete: {} },
    } : {},
  },
});
