import multer from 'multer';
import cloudinary from 'cloudinary';
import fs from 'fs';
const cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
  cloud_name: 'dlawn8l7s',
  api_key: '141432636693916',
  api_secret: 'qy4rw2ZFompWD7KP9d4FRiMO5Pc',
});
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploadToCloudinary = async (locaFilePath: string) => {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary

  try {
    const result = await cloudinaryV2.uploader.upload(locaFilePath, {});

    // Image has been successfully uploaded on
    // cloudinary So we dont need local image
    // file anymore
    // Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    return result.url;
  } catch (err) {
    // Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    return { message: 'Fail' };
  }
};
export const uploadVideoToCloudinary = async (locaFilePath: string) => {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary

  try {
    const result = await cloudinaryV2.uploader.upload(locaFilePath, { resource_type: 'video' });
    // Image has been successfully uploaded on
    // cloudinary So we dont need local image
    // file anymore
    // Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    return result.url;
  } catch (err) {
    // Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    return { message: 'Fail' };
  }
};
export const uploadFileToCloudinary = async (locaFilePath: string) => {
  // locaFilePath: path of image which was just
  // uploaded to "uploads" folder

  // filePathOnCloudinary: path of image we want
  // to set when it is uploaded to cloudinary

  try {
    const result = await cloudinaryV2.uploader.upload(locaFilePath, { resource_type: 'auto' });
    // Image has been successfully uploaded on
    // cloudinary So we dont need local image
    // file anymore
    // Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    return result.url;
  } catch (err) {
    console.log(err);

    // Remove file from local uploads folder
    fs.unlinkSync(locaFilePath);
    return { message: 'Fail' };
  }
};
export const upload = multer({ storage });
