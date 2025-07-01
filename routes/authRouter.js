const router = require("express").Router();
const authController = require("../controllers/authController");
const middleware = require("../middleware");

router.post("/login", authController.Login);
router.post("/register", authController.Register);
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  authController.CheckSession
);

router.post(
  "/password-update",
  middleware.stripToken,
  middleware.verifyToken,
  authController.UpdatePassword
);

module.exports = router;
