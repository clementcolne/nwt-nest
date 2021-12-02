import { extname } from 'path';

/**
 * Only allow images and video
 */
export const mediaFilter = (req, file: Express.Multer.File, callback) => {
  if (!file.mimetype.includes('image/') && !file.mimetype.includes('video/')) {
    return callback(new Error('Only images are allowed'), false);
  }
  callback(null, true);
};

/**
 * Create unique name for the file
 */
export const editFileName = (req, file, callback) => {
  const name = file.originalname.substring(
    0,
    file.originalname.lastIndexOf('.'),
  );
  const ext = extname(file.originalname);
  const uuid = Array(8)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, name + '_' + uuid + ext);
};
