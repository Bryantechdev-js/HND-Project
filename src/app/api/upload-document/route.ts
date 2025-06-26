// server/api/upload-document.js
import fs from 'fs';
import path from 'path';
import multer from 'multer';

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix); // Save with unique name
  },
});

const upload = multer({ storage: storage });

export default function handler(req, res) {
  if (req.method === 'POST') {
    upload.single('file')(req, res, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error during file upload' });
      }

      // If no file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Handle file analysis (assuming you have a document analyzer function)
      const filePath = path.join(uploadDir, req.file.filename);
      // Example analysis - replace this with actual analysis logic
      const analysis = `File ${req.file.originalname} uploaded successfully! Path: ${filePath}`;
      
      res.status(200).json({ message: 'File uploaded successfully', analysis });
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
