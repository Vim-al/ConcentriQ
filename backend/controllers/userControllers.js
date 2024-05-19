const asyncHandler = require("express-async-handler"); //this package handles the errors easily
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body; //here the name,email,password,pic are destructured
  //the request is the details above

  if (!name || !email || !password) {
    res.status(400); //400 is failure status
    throw new error("Please Enter all the Fields"); //if all the fields are not entered then this error is thrown
  }

  const userExists = await User.findOne({ email }); //User is the userModel we created in models
  //await User.findOne({ email }) finds if there is any email that already exists in the database
  if (userExists) {
    res.status(400);
    throw new error("User already exists"); //if th user already exists then this error is thrown
  }

  const user = await User.create({
    //creates a new user with the following details
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    }); //these details are sent to the user
  } else {
    res.status(400);
    throw new error("Failed to create the User");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid password or email");
  }
});

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          //it is like if
          { name: { $regex: req.query.search, $options: "i" } }, // if the input is matching anything in the name
          { email: { $regex: req.query.search, $options: "i" } }, // if the input is matching anything in the email
        ],
      }
    : {}; //it is like else

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); //other than the current user return all the options
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers }; //this is a named export where we can send multiple values
