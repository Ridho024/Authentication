import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

// Get all product based on role
export const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      // Jika user role = admin maka bisa mengambil semua data
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
      return res.status(200).json(response);
    } else {
      // Jika user role = user maka hanya bisa mengambil data produk yang user aplod
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Get product by ID
export const getProductByID = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan" });

    let response;
    if (req.role === "admin") {
      // Jika user role = admin maka bisa mengambil semua data
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
      return res.status(200).json(response);
    } else {
      // Jika user role = user maka hanya bisa mengambil data produk yang user aplod
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });

      if (!response) return res.status(403).json({ msg: "Akses ditolak" });
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Products.create({
      name: name,
      price: price,
      userId: req.userId,
    });

    return res.status(201).json({ msg: "Berhasil menambahkan product" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan" });

    const { name, price } = req.body;
    if (req.role === "admin") {
      await Products.update(
        { name, price },
        {
          where: {
            id: product.id,
          },
        }
      );

      return res.status(200).json({ msg: "Berhasil update produk" });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses ditolak" });
      await Products.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }

    return res.status(200).json({ msg: "Produk berhasil di update" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan" });

    if (req.role === "admin") {
      await Products.destroy({
        where: {
          id: product.id,
        },
      });

      return res.status(200).json({ msg: "Berhasil hapus produk" });
    } else {
      if (req.userId !== product.userId) return res.status(403).json({ msg: "Akses ditolak" });
      await Products.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }

    return res.status(200).json({ msg: "Produk berhasil di hapus" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
