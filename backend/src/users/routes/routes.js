const validateRegistration = require("../validations/registraion");
const validateSignin = require("../validations/signIn");
const { comparePassword, generateHashPassword } = require("../helpers/bcrypt");
const { generateAuthToken } = require("../helpers/token");
const _ = require("lodash");

const router = require("express").Router();
const User = require("../models/model");
const authorizationMiddlware = require("../../helpers/authorizationMiddleware");

router.post("/signUp", async (req, res) => {
  console.log(req.body);
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );

  user.password = generateHashPassword(user.password);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email", "biz"]));
});

router.post("/signin", async (req, res) => {
  const { error } = validateSignin(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.status(200).json({
    status: "success",
    data: {
      token: generateAuthToken(user),
      user: user,
    },
  });
});

//  To do add url  to  get user data

router.get("/userdata", authorizationMiddlware, (req, response) => {
  const mongoDbUserId = req.userid;

  User.findById(mongoDbUserId)
    .select("-password")
    .then((user) => response.json(user))
    .catch((errorsFromMongoose) =>
      response.status(500).json(errorsFromMongoose)
    );
});

module.exports = router;
