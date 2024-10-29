import express from "express";
import { getUsers, getUserByID, createUser, updateUser, deleteUser } from "../controllers/Users.js";

const router = express.Router();
router.get("/users", getUsers);
router.get("/user/data/:id", getUserByID);
router.post("/users", createUser);
router.patch("/user/edit/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;