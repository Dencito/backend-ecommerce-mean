const cloudinary = require("cloudinary");
const Product = require("../models/Product");

cloudinary.config({
  cloud_name: "dhtqkecgl",
  api_key: "142211625462429",
  api_secret: "A9UICs_vYl0D5-rLX1Pm9F-7eHU",
});

const createProduct = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ error: "No se ha seleccionado ningún archivo" });
    }

    const result = await cloudinary.v2.uploader.upload(file.path);

    const imageUrl = result.secure_url;

    const {
      name,
      price,
      descr,
      size,
      category,
      state,
      /* season,
      fit,
      gender,
      fabric,
      style,
      specifications,
      avaliable, */
      stock,
      userId,
    } = req.body;
    /* const size = JSON.parse(req.body.size); */

   /*  Descripcion;
    Categoria;
    Talle;
    Estado;
    Precio; */

    const product = await Product.create({
      name,
      price,
      descr,
      category,
      state,
      /* season,
      fit,
      gender,
      fabric,
      style,
      specifications,
      avaliable,
      size, */
      size,
      stock,
      image: imageUrl,
      userId,
    });
    const prodId = await Product.findById(product._id);
    const productDetailsPromises = products.map(async (product) => {
      const user = await User.findById(product.userId);
    
      const productDetails = {
        user,
        product,
      };

      console.log(productDetailsPromises)
    
      return productDetails;
    });

    res
      .status(201)
      .json({ message: "Product created successfully", data: prodId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const fechaActualizacion = new Date();
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve products" });
  }
};

const getProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product found successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve product" });
  }
};

const deleteProductId = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndRemove(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product remove successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve product" });
  }
};

const editProductId = async (req, res) => {
  try {
    let file = req?.file;
    let imageUrl;

    if (file) {
      const result = await cloudinary.v2.uploader.upload(file.path);

      imageUrl = result.secure_url;
    }

    const {
      name,
      price,
      descr,
      size,
      category,
      state,
      /* season,
      fit,
      gender,
      fabric,
      style,
      specifications,
      avaliable, */
      stock,
      userId,
    } = req.body;
    /* const size = JSON.parse(req.body.size); */
    const productId = req.params.id;
    const product = await Product.findById(productId);
    const imageProd = !file ? product?.image : imageUrl;
    const productUpdate = await Product.findByIdAndUpdate(productId, {
      name,
      price,
      descr,
      category,
      state,
      /* season,
      fit,
      gender,
      fabric,
      style,
      specifications,
      avaliable,
      size, */
      size,
      stock,
      image: imageProd,
      userId,
    });
    const productEdit = await Product.findById(productId);
    res
      .status(201)
      .json({ message: "Product updated successfully", data: productEdit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to updated product" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductId,
  deleteProductId,
  editProductId,
};
