const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  //the function present in userControllers.js
  return await bcrypt.compare(enteredPassword, this.password); //compares the password and returns the status
};

userSchema.pre("save", async function name(next) {
  //before saving the function is called
  if (!this.isModified) {
    //if the password is modified
    next(); //then the process is continued
  }
  //else we encrypt the password
  const salt = await bcrypt.genSalt(10); //the higher the number the more salt will be generated
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
