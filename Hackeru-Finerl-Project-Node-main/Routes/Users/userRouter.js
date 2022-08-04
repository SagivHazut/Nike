const validateRegistration = require("./usersValidations/registraion");
const validateSignin = require("./usersValidations/signIn");
const {
  comparePassword,
  generateHashPassword,
} = require("../../services/bcrypt");
const { generateAuthToken } = require("../../services/token");
const _ = require("lodash");
const router = require("express").Router();
const User = require("./userModel");
const auth = require("../../middlewares/authorization");

router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    return res.send(users);
  } catch (error) {
    console.log(chalk.redBright(error.message));
    return res.status(500).send(error.message);
  }
});
router.delete("/:id", auth, async (req, res) => {
  try {
    let user = req.user;

    const userID = req.params.id;
    let card = await User.findById(userID);

    {
      card = await User.findOneAndRemove({ _id: userID });
      return res.send(card);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});
router.post("/register", async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, ["name", "email", "password", "biz", "cards"])
  );

  user.password = generateHashPassword(user.password);
  await user.save();
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/login", async (req, res) => {
  const { error } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = comparePassword(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  res.json({
    token: generateAuthToken(user),
  });
});


router.post("/favorite/:id", async (req, res) => {
  try {
    let card = req.body;
    cardArr = { favorite: card };
    console.log(cardArr);
    const filter = {
      _id: req.params.id,
    };
    card = await User.findOneAndUpdate(filter, cardArr);
    if (!card) {
      console.log("No card with this ID in the database!");
      return res.status(404).send("No card with this ID in the database!");
    }

    card = new User(card);
    await card.save();
    return res.send(card);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
});

router.get("/userInfo", auth, (req, res) => {
  let user = req.user;
  // if (user.biz) return res.status(403).json("Un authorize user!"); // מראה בדיקה אם המשתמש הוא עסקי

  User.findById(user._id)
    .select(["-password", "-createdAt", "-__v", "_id"])
    .then((user) => res.json(user))
    .catch((errorsFromMongoose) => res.status(500).json(errorsFromMongoose));
});

module.exports = router;
