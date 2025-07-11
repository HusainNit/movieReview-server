const express = require("express");
const favoritesController = require("../controllers/favoritesController");
const router = express.Router();
const middleware = require("../middleware");

router.delete(
  "/delete/:id",
  middleware.stripToken,
  middleware.verifyToken,
  favoritesController.removeFavorite
);

router.get(
  "/myFavorite",
  middleware.stripToken,
  middleware.verifyToken,
  favoritesController.GetMyFavorite
);

module.exports = router;
