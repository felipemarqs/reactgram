const express = require("express");
const router = express();

//Use Cases imports
const testRoute = require("./app/useCases/testRoute");

// User routers
const { register, login ,getCurrentLoggedUser } = require("./controllers/UserControler");


//Middlewares
//Validate User
const validate = require("./middlewares/handleValidation");
const {userCreateValidation , loginValidation} = require("./middlewares/userValidations");
const authGuard = require("./middlewares/authGuard");

// UseCases declaration area (Folder useCases)


// User Routes ======================================================================

// Create User

router.post("/register", userCreateValidation() , validate, register);

// Login User

router.post("/login", loginValidation(), validate , login)

//get current logged user
router.get("/users/profile" , authGuard ,getCurrentLoggedUser)


//test
module.exports = router;
