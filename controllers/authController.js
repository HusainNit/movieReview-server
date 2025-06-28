const User = require("../models/Users");

const middleware = require("../middleware");

const Register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    let passwordDigest = await middleware.hashPassword(password);

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!");
    } else {
      const user = await User.create({
        email,
        password: passwordDigest,
        name,
        role,
      });
      res.send(user);
    }
  } catch (error) {
    throw error;
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).send({ status: "Error", msg: "Unauthorized" });
    }
    let matched = await middleware.comparePassword(password, user.password);
    if (matched) {
      let payload = {
        id: user._id,
        email: user.email,
      };
      let token = middleware.createToken(payload);
      return res.send({ user: payload, token });
    }
    res.status(401).send({ status: "Error", msg: "Unauthorized" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "Error", msg: "An error has occurred!" });
  }
};
const CheckSession = async (req, res) => {
  const { payload } = res.locals;
  res.status(200).send(payload);
};

module.exports = {
  Register,
  Login,
  CheckSession,
};
