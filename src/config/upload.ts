import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(15).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;
      callback(null, fileName);
    },
  }),
};
