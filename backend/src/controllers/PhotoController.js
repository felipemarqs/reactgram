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
    return;
  }

  return res.status(201).json(newPhoto);
};

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: ["A error occurred while creating photo"] });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);
  res
    .status(200)
    .json({ id: photo._id, message: "Photo deleted successfully!" });
  } catch (error) {

    res.status(404).json({ errors: ["Photo not found"] });
  }
  

  //check if photo exists

 

  //Check if photo belongs to user

 

  
};

module.exports = {
  insertPhoto,
  deletePhoto,
};
