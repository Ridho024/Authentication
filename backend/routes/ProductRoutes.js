import express from "express";
import { getProducts, getProductByID, createProduct, updateProduct, deleteProduct } from "../controllers/Products";

const router = express.Router();
router.get("/products", getProducts);
router.get("/product/data/:id", getProductByID);
router.post("/products", createProduct);
router.patch("/product/edit/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
