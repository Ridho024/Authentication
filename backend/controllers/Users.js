import Users from "../models/UserModel.js";
import argon2 from "argon2"; // For hashing password

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, passwordConfirmation, role } = req.body;
  if (password !== passwordConfirmation) return res.status(400).json({ msg: "Password dan password confirmation tidka sesuai" });
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });

    res.status(201).json({ msg: "Registrasi user berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, email, password, passwordConfirmation, role } = req.body;
  let hashPassword;

  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }

  if (password !== passwordConfirmation) return res.status(400).json({ msg: "Password dan password confimation tidak sama" });

  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.status(200).json({ msg: "Update user berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = Users.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  
  try {
    await Users.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ msg: "Delete user berhasil" });
  } catch (error) {
  
    return res.status(400).json({ msg: error.message });
  }
};