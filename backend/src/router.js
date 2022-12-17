const express = require("express");
const router = express();

//Use Cases imports


// User routers
const {
  register,
  login,
  getCurrentLoggedUser,
  update,
  getUserById,
} = require("./controllers/UserControler");

//Photos routes

const {
  insertPhoto
} = require("./controllers/PhotoController")

//Middlewares
//User Middlewares
const validate = require("./middlewares/handleValidation");
const {
  userCreateValidation,
  loginValidation,
  userUpdateValidations,
} = require("./middlewares/userValidations");
const authGuard = require("./middlewares/authGuard");
const { imageUpload } = require("./middlewares/imageUpload");

//Photo Middlewares
const {photoInsertValidation} = require("./middlewares/photoValidation");

// UseCases declaration area (Folder useCases)

// User Routes 

// Create User
router.post("/users/register", userCreateValidation(), validate, register);

// Login User
router.post("/users/login", loginValidation(), validate, login);

//get current logged user
router.get("/users/profile", authGuard, getCurrentLoggedUser);

//Update user
router.put(
  "/users/",
  authGuard,
  userUpdateValidations(),
  validate,
  imageUpload.single("profileImage"),
  update
);

//get User by id
router.get("/users/:id", getUserById);



//Photos Routes 

router.post("/photos/" , authGuard , imageUpload.single("image") , photoInsertValidation(), validate ,insertPhoto)



module.exports = router;

