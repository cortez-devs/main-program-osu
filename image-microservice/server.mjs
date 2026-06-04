import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const imagesDir = path.join(__dirname, 'images');
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'images.json');

if (!fs.existsSync(imagesDir))  fs.mkdirSync(imagesDir, { recursive: true });
if (!fs.existsSync(dataDir))  fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, "[]");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, imagesDir),
    filename: (req, file, cb) => {
        const id = Date.now().toString();
        const ext = path.extname(file.originalname);
        cb(null, id + ext);
    }
});

const upload = multer({ storage });

function readMetadata() {
    return JSON.parse(fs.readFileSync(dataFile));
}

function writeMetaData(data) {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const id = path.parse(req.file.filename).name;

    const metadata = readMetadata();
    const entry = {
        id,
        filename: req.file.filename,
        originalName: req.file.originalname,
        uploadedAt: new Date().toISOString()
    };

    metadata.push(entry);
    writeMetaData(metadata);

    res.json({
        message: "Image uploaded",
        id,
        filename: req.file.filename
    });
});

app.get('/images/:id', (req, res) => {
    const metadata = readMetadata();
    const entry = metadata.find(img => img.id === req.params.id);

    if (!entry) return res.status(404).json({ error: "Image not found"});

    const filePath = path.join(imagesDir, entry.filename);
    res.sendFile(filePath);
});

app.delete('/images/:id', (req, res) => {
    const metadata = readMetadata();
    const index = metadata.findIndex(img => img.id === req.params.id);

    if (index === -1) return res.status(404).json({ error:"Image not found" });

    const entry = metadata[index];
    const filePath = path.join(imagesDir, entry.filename);

    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    metadata.splice(index, 1);
    writeMetaData(metadata);

    res.json({ message: "Image deleted" });
});

app.listen(3000, () =>
    console.log('Image microservice running on port 3000'));
