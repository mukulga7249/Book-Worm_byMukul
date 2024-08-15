const cloudinary = require('cloudinary').v2;
require('dotenv').config();


cloudinary.config({ 
    cloud_name: 'dmsr08som', 
    api_key: '669284682193239', 
    api_secret: 'QNTMU8YXaMrDDgEd-I7RMy-9b7E',
  });

  const cloudinaryUploadImg = async (fileToUpload) => {
    try {
        const result = await cloudinary.uploader.upload(fileToUpload, {
            resource_type: "auto"
        });
        return {
            url: result.secure_url
        };
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Error uploading image to Cloudinary');
    }
};

  module.exports = cloudinaryUploadImg;