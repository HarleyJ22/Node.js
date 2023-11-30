import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import Joi from "joi";

dotenv.config();

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: "Earth",
  },
  {
    id: 2,
    name: "Mars",
  },
];

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));

// Joi validation
const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

// GET
app.get("/api/planets", (req, res) => {
  res.status(200).json(planets);
});

// GET A SPECIFIC PLANET ID
app.get("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));

  res.status(200).json(planet);
});

// CREATE A NEW PLANET
app.post("/api/planets", (req, res) => {
  const { id, name } = req.body;
  const newPlanet = { id, name };
  const validateNewPlanet = planetSchema.validate(newPlanet);

  if (validateNewPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateNewPlanet.error.details[0].message });
  } else {
    planets = [...planets, newPlanet];
    res.status(201).json({ msg: "The planet was created" });
  }
});

// UPDATE A PLANET BY ID
app.put("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const updatedPlanet = { id, name };
  const validateUpdatedPlanet = planetSchema.validate(updatedPlanet);

  if (validateUpdatedPlanet.error) {
    return res
      .status(400)
      .json({ msg: validateUpdatedPlanet.error.details[0].message });
  } else {
    planets = planets.map((p) => (p.id === Number(id) ? { ...p, name } : p));
    res.status(200).json({ msg: "The planet was updated" });
  }
});

// DELETE
app.delete("/api/planets/:id", (req, res) => {
  const { id } = req.params;
  planets = planets.filter((p) => p.id !== Number(id));

  res.status(200).json({ msg: "The planet was deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
