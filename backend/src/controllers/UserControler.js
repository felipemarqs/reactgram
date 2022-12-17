const User = require("../app/models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Generate user token

const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Register user and Sing In

const register = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user is already registered

  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["User already registered!"] });
    return;
  }

  //Generate password hash

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  //Create user

  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // if user was created successfully, return token

  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Error creating user, try again later..."] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};


//Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({email})

  console.log(user);

  if (!user) {
    res.status(404).json({ errors: ["User does not exist."] });
    return;
  }

  //Check if password matches

   if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ errors: ["Wrong password"] });
    return;
  }

  //Return user with Token

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// get current user
const getCurrentLoggedUser = async (req, res) => {

  const user = req.user
  res.status(200).json(user)
}

//Update user

const update = (req, res) => {
  res.send("update user")
}

module.exports = {
  register,
  login,
  getCurrentLoggedUser,
  update
};
