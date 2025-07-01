const express = require("express");
const router = express.Router();

const middleware = require("../middleware");
const userController = require("../controllers/usersController.js");

router.get(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  userController.GetUserData
);

router.post(
  "/img",
  middleware.stripToken,
  middleware.verifyToken,
  userController.ImgChange
);

module.exports = router;
