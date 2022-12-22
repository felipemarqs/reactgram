const { validationResult } = require("express-validator");

//Function to handle validation errors

const validate = (req, res, next) => {

  //The erros is stored in this const variable
  const errors = validationResult(req);

  // if erros are empty, then this continue to de next step
  if (errors.isEmpty()) {
    return next();
  }

  
  const extractedErros = [];

  //otherwise, the errors will be stored in this array 'extractedErros'
  //to be displayed in the frontend.
  errors.array().map((err) => extractedErros.push(err.msg));

  res.status(422).json({
    errors: extractedErros,
  });
};

module.exports = validate;
