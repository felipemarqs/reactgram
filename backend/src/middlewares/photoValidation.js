const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("Title is required")
      .isString()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title has to be at least 3 characters"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required");
      }
      return true;
    }),
  ];
};

const photoCommentValidation = () => {
  return [
    body("comment")
      .isString()
      .withMessage("Comment is required")
  ]
}

module.exports = {
    photoInsertValidation,
    photoCommentValidation
};
