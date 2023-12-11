import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
  createImage,
} from "./controllers/planets.js";
import { logIn, signUp, logOut } from "./controllers/users.js";
import authorize from "./authorize.js";
import multer from "multer";
import "./passport.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

// GET ALL PLANETS
app.get("/api/planets", getAll);

// GET A SPECIFIC PLANET ID
app.get("/api/planets/:id", getOneById);

// CREATE A NEW PLANET
app.post("/api/planets", create);

// UPDATE
app.put("/api/planets/:id", updateById);

// DELETE
app.delete("/api/planets/:id", deleteById);

//UPLOAD IMAGE
app.post("/api/planets/:id/image", upload.single("image"), createImage);

//LOGIN
app.post("/api/users/login", logIn);

//SIGNUP
app.post("/api/users/signup", signUp);

//LOGOUT
app.get("/api/users/logout", authorize, logOut);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
