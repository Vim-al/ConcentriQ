const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers); //the adress is after the /api/user that means this represents /api/user/  //route is used to change multiple requests //later this is updated to what it is now which has post and get and protect and allUsers where protect verifies before going into the user
router.post("/login", authUser); // the address here is /api/user/login     this /api/user is from server.js

module.exports = router;
