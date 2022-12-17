const express = require("express");
const router = express();

//Use Cases imports
const testRoute = require("./app/useCases/testRoute");

// User routers
const { register, login , getCurrentLoggedUser ,update } = require("./controllers/UserControler");


//Middlewares
//Validate User
const validate = require("./middlewares/handleValidation");
const {userCreateValidation , loginValidation , userUpdateValidations} = require("./middlewares/userValidations");
const authGuard = require("./middlewares/authGuard");
const {imageUpload} = require("./middlewares/imageUpload");

// UseCases declaration area (Folder useCases)


// User Routes ======================================================================

// Create User

router.post("/users/register", userCreateValidation() , validate, register);

// Login User

router.post("/users/login", loginValidation(), validate , login)

//get current logged user
router.get("/users/profile" , authGuard ,getCurrentLoggedUser)

//Update user

router.put(
    "/users/",
    authGuard,
    userUpdateValidations(),
    validate,
    imageUpload.single("profileImage"),
    update
);


//test
module.exports = router;
