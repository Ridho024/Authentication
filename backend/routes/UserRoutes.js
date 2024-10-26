import express from "express"
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from "../controllers/Users"

const router = express.Router()
router.get("/users", getProducts);
router.get("/user/data/:id", getProductByID);
router.post("/users", createProduct);
router.patch("/user/edit/:id", updateProduct);
router.delete("/user/:id", deleteProduct);

export default router;