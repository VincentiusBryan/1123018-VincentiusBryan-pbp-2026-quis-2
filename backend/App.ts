import express from "express";
import dotenv from "dotenv";
import db from "./models";

dotenv.config();

const { User } = db as any;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API jalan");
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.listen(process.env.PORT, () => {
  console.log(`Server jalan di port ${process.env.PORT}`);
});