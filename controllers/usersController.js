const Movie = require("../models/Movie");
const Review = require("../models/Review");
const Favorite = require("../models/Favorite");
const User = require("../models/User");

const GetUserData = async (req, res) => {
  try {
    const { email } = res.locals.payload;

    let user = await User.findOne({ email: email })
      .populate("favorites")
      .populate("reviews");

    res.json(user);
  } catch (error) {
    console.log("cant get user data" + error.message);
  }
};

module.exports = {
  GetUserData,
};
