import express from "express";
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from "../controllers/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/users", verifyUser, adminOnly, getUsers);
router.get("/user/data/:id", verifyUser, adminOnly, getUserByID);
router.post("/users", verifyUser, adminOnly, createUser);
router.patch("/user/edit/:id", verifyUser, adminOnly, updateUser);
router.delete("/user/:id", verifyUser, adminOnly, deleteUser);

export default router;
