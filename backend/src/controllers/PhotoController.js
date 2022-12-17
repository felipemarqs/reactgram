const Photo = require("../app/models/Photo");
const User = require("../app/models/User");

const mongoose = require("mongoose");

//Insert a photo with a user related

const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  //create a new photo

  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  //if photo was successfully created

  if (!newPhoto) {
    res.status(404).json({
      errors: ["A error occurred while creating photo"],
    });
  }

  return res.status(201).json(newPhoto);



  
};

module.exports = {
  insertPhoto,
};
