import cloudinary from "../../config/cloudinary.js";
import type { UploadApiOptions } from "cloudinary";

type TypeFileUpload = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};

class CloudinaryService {
  uploadImage = async (files: TypeFileUpload[], options: UploadApiOptions) => {
    try {
      const result = await new Promise((resolve, reject) => {
        const buffers = files.map((file) => file.buffer);

        buffers.forEach((buffer) => {
          cloudinary.uploader
            .upload_stream(options, (error, result) => {
              if (error) return reject(error);
              return resolve(result);
            })
            .end(buffer);
        });
      });

      return result;
    } catch (error) {
      console.log(error);
    }
  };

  deleteUpload = async (publicIds: string[]) => {
    try {
      const result = await new Promise((resolve, reject) => [
        publicIds.forEach((publicId) => {
          cloudinary.uploader.destroy(publicId, { resource_type: "image" }, (error, result) => {
            if (error) return reject(error);
            return resolve(result);
          });
        }),
      ]);

      return result;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new CloudinaryService();
