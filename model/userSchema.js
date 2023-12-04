const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  lable: String,
  userID: String,
  book_slots: {
    type: Array,
    default: [],
  },
});

const userModel = mongoose.model("user", UserSchema);

module.exports = {
  userModel,
};
