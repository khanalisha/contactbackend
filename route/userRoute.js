const express = require("express");
const { userModel } = require("../model/userSchema");

const AllUserRoutes = express.Router();

AllUserRoutes.post("/contacts", async (req, res) => {
  const { name, email, phone, lable, book_slots } = req.body;

  try {
    const user = new userModel({ name, email, phone, lable, book_slots });
    await user.save();
    res.status(200).json({ msg: "user is added", user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

AllUserRoutes.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const UpdatePost = req.body;
  const name = req.body.name;
  try {
    const UpdateUser = await userModel.findByIdAndUpdate(
      { _id: id, name },
      UpdatePost,
      { new: true }
    );

    if (!UpdateUser) {
      res.status(400).json({ msg: "User not found" });
    }
    res.status(200).json({ mag: "Updated user", UpdateUser });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});

AllUserRoutes.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const name = req.body.name;
  try {
    const deleteUser = await userModel.findByIdAndDelete({ _id: id, name });

    if (!deleteUser) {
      res.status(400).json({ msg: "User not delete" });
    }
    res.status(200).json({ mag: "deleted user", deleteUser });
  } catch (error) {
    res.status(401).json({ error: error });
  }
});
AllUserRoutes.get("/allUser", async (req, res) => {
  const { name, email, phone, lable, book_slots } = req.body;
  try {
    const user = await userModel.find();
    res.status(200).json({ msg: "get all users", user: user });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

AllUserRoutes.get("/search", async (req, res) => {
  const { firstName } = req.query;

  try {
    const users = await userModel.find({
      name: { $regex: new RegExp(firstName, "i") },
    });
    if (users.length === 0) {
      res.status(404).json({ mag: "No user match" });
    }
    res.status(200).json({ mag: "User Found", users });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

module.exports = {
  AllUserRoutes,
};
