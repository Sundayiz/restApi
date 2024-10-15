import dotenv from "dotenv";
dotenv.config();
import express from "express";
import User from "./model/user.model.js";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";

const app = express();
connectDB();

const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.get("/update-users", async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

app.post("/create-user", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    fullName: name,
    email,
    password,
  });
  const savedUser = await newUser.save();

  res.status(201).json({
    message: "User created, ",
    user: { fullName: savedUser.fullName },
  });
});
//route to get a user by id(using query params)
app.put("/get-user", async (req, res) => {
  try {
    const { userId } = req.query;
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(400).json({ message: "User not found" });
  }
});

app.delete("/delete-user", async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
/*
app.delete("/delete-user/:Id", async (req, res) => {
  try {
    const userId = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted" });
}catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});
*/

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
