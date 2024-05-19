const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer") //this says that if something is there in req.headers.authorization and the token is a bearer token then go to 13th line
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]; //generally the token is an bearer token and it can be represented like bearer slfdkjsdfjsadlfkjsdlf and here we extract the token and exlude the bearer which is the first part of the array

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //here we verify

      req.user = await User.findById(decoded.id).select("-password"); //here we're gonna find the user with the request and return it without the password

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
