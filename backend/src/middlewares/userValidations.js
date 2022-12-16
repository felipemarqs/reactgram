const { body } = require("express-validator");

//Using the express valitador to validate the User register


/* First i created a function that will be called when the route is requested
then, get the body params and do the required validations using the express-validator method */
const userCreateValidation = () => {
  return [
    body("name").isString().withMessage("Name is required!"),
    body("email")
      .isString() //check if it's a string
      .withMessage("Email is required!") //Send the mensage error to the array
      .isEmail() //check if it's a email
      .withMessage("Please enter a valid email address"),
    body("password")
        .isString()
        .withMessage("Password is required!")
        .isLength({ min : 3 }) // Set a minimum length 
        .withMessage("Password must be at least 3 characters"),
    body("confirmPassword").
        isString()
        .withMessage("Confirm Password is required!")
        .custom((value , {req }) => {     //Creating a custom validation
            if (value !== req.body.password ){
                throw new Error("Passwords does not match")
            }
            return true;
        })

  ];
};

module.exports = {
  userCreateValidation,
};
