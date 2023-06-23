const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const admin = require('firebase-admin');
const Multer = require('multer');

const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'ecommerce-ifts11.appspot.com'
});
const bucket = admin.storage().bucket();

const upload = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

router.post('/', upload.single('image'), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No se ha seleccionado ningún archivo' });
  }

  const filename = Date.now() + '-' + file.originalname;
  const filePath = 'images/' + filename;

  const fileUpload = bucket.file(filePath);
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });

  stream.on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Ocurrió un error al subir el archivo' });
  });

  stream.on('finish', async () => {
    const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
    try {
      const { name, price, descr, season, fit, gender, fabric, style, specifications, avaliable } = req.body;
      const size = JSON.parse(req.body.size)
      const product = await Product.create({ name, price, descr, season, fit, gender, fabric, style, specifications, avaliable, size });
      await Product.findByIdAndUpdate(product._id, { image: url });
      const prodId = await Product.findById(product._id);
      res.status(201).json({ message: 'Product created successfully', data: prodId });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create product' });
    }
  });

  stream.end(file.buffer);
});




/* const multer = require('multer');
// Configurar el almacenamiento de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price } = req.body;
    const image = req.file.filename; // Obtener el nombre de archivo de la imagen cargada
    const product = await Product.create({ name, price, image });
    const imgUpdate = await Product.findByIdAndUpdate(product._id, {image: `/api/products/images/${product.image}`});
    res.status(201).json({ message: 'Product created successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product' });
  }
});

router.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../../uploads', filename);
    res.sendFile(imagePath);
  });
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve products' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product found successfully', data: product });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndRemove(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product remove successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const productUpdate = await req.body
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(productId, productUpdate);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', data: productUpdate });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve product' });
  }
});



module.exports = router;