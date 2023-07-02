const express = require("express");
const Multer = require("multer");
const { products } = require("../controllers/controllers");
const router = express.Router();

const upload = Multer({
  storage: Multer.diskStorage({}),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", upload.single("image"), products.createProduct);
router.get("/", products.getProducts);
router.get("/:id", products.getProductId);
router.delete("/:id", products.deleteProductId);
router.put("/:id", upload.single("image"), products.editProductId);

/* router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No se ha seleccionado ningún archivo' });
  }

  console.log(file)

  try {
    const result = await cloudinary.uploader.upload(file.path);
    console.log(result)

    // La URL de la imagen se encuentra en result.secure_url
    const imageUrl = result.secure_url;

    const { name, price, descr, season, fit, gender, fabric, style, specifications, avaliable, stock } = req.body;
    const size = JSON.parse(req.body.size)
    await Product.create({ name, price, descr, season, fit, gender, fabric, style, specifications, avaliable, size, stock, image: imageUrl });
    const product = await Product.findById(product._id);

    res.status(201).json({ message: 'Product created successfully', data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
}); */

/* router.post('/', upload.single('image'), (req, res) => {
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
    //const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
    const url = `https://storage.googleapis.com/${bucket.name}/${filename}`;
    //console.log("https://firebasestorage.googleapis.com/v0/b/"+bucket.name+  "/o/images%"+ fileUpload.name.split("/")[1]+"?alt=media&token=9bbe9e9b-5c71-4d33-bcf6-c4b3d35a5d26")
    
    try {
      const { name, price, descr, season, fit, gender, fabric, style, specifications, avaliable, stock } = req.body;
      const size = JSON.parse(req.body.size)
      const product = await Product.create({ name, price, descr, season, fit, gender, fabric, style, specifications, avaliable, size, stock });
      await Product.findByIdAndUpdate(product._id, { image: url });
      const prodId = await Product.findById(product._id);
      res.status(201).json({ message: 'Product created successfully', data: prodId });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create product' });
    }
  });

  stream.end(file.buffer);
}); */

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

module.exports = router;
