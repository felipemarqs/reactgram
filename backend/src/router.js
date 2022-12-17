const express = require("express");
const router = express();

//Use Cases imports
const testRoute = require("./app/useCases/testRoute");

// User routers
const { register, login } = require("./controllers/UserControler");


//Middlewares
//Validate User
const validate = require("./middlewares/handleValidation");
const {userCreateValidation , loginValidation} = require("./middlewares/userValidations");

// UseCases declaration area (Folder useCases)


// User Routes ======================================================================

// Create User

router.post("/register", userCreateValidation() , validate, register);

// Login User

router.post("/login", loginValidation(), validate , login)



module.exports = router;
