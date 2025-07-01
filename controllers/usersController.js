const Movie = require("../models/Movie");
const Review = require("../models/Review");
const Favorite = require("../models/Favorite");
const User = require("../models/User");

const GetUserData = async (req, res) => {
  try {
    const { email } = res.locals.payload;

    let user = await User.findOne({ email: email })

    res.json(user);
  } catch (error) {
    console.log("cant get user data" + error.message);
  }
};

const ImgChange = async (req, res) => {
  try {
    const { id: userId } = res.locals.payload;

    let user = await User.findByIdAndUpdate(userId, {
      profileImg: req.body.imgpath,
    });

    res.json({ success: true });
  } catch (error) {
    console.log("cant get user data" + error.message);
  }
};

module.exports = {
  GetUserData,
  ImgChange,
};
