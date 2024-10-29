import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import db from "./config/Database.js";
dotenv.config();

const app = express();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: "auto", // auto, jadi ketika menerima request http maka false, sebaliknya ketika menerima request https maka false
    },
  })
);

app.use(
  // Mengizinkan frontend mengirim data dengan session
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json()); // Menerima data dengan format json

app.use(UserRoutes);
app.use(ProductRoutes);

app.listen(process.env.APP_PORT, () => console.log(`Server listening on port: 5000`));
