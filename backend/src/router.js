const express = require("express");
const router = express();

//Use Cases imports
const testRoute = require("./app/useCases/testRoute");

// User routers
const { register } = require("./controllers/UserControler");

//Middlewares
//Validate User
const validade = require("./middlewares/handleValidation");

// UseCases declaration area (Folder useCases)

// testRoute
router.get("/", testRoute);

// User Routes

router.get("/register", validade, register);

module.exports = router;
