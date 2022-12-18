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

//Delete a photo with a user related

const deletePhoto = async (req, res) => {
  const { id } = req.params;

  const reqUser = req.user;

  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));

    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: ["User not authenticated"] });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);
    res
      .status(200)
      .json({ id: photo._id, message: "Photo deleted successfully!" });
  } catch (error) {
    res.status(404).json({ errors: ["Photo not found"] });
  }
};

//get all photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt, -1"]])
    .exec();

  res.status(200).json(photos);
};

//get user photos

const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  const photos = await Photo.find({ userId: id })
    .sort([["createdAt, -1"]])
    .exec();

  res.status(200).json(photos);
};

//get photo by id

const getPhotoById = async (req, res) => {
  const { id } = req.params;
  const photo = await Photo.findById(mongoose.Types.ObjectId(id));

  if (!photo) {
    res.status(404).json({ errors: ["Photo not found"] });
    return;
  }

  res.status(200).json(photo);
};

//Update photo

const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const reqUser = req.user;
    const photo = await Photo.findById(id);

    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({ errors: ["User not authenticated"] });
      return;
    }

    if (title) {
      photo.title = title;
    }

    await photo.save();

    res.status(200).json({ photo, message: "Photo updated successfully!" });
  } catch (error) {
    res.status(404).json({ errors: ["Photo not found"] });
  }
};

//Like photo

const likePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const reqUser = req.user;

    const photo = await Photo.findById(id);

    if (photo.likes.includes(reqUser._id)) {
      userIndex = photo.likes.indexOf(reqUser._id);

      photo.likes.splice(reqUser._id);

      await photo.save();

      res.status(200).json({
        photoId: id,
        userId: reqUser._id,
        message: "Photo disliked successfully",
      });
    } else {
      photo.likes.push(reqUser._id);
      await photo.save();

      res.status(200).json({
        photoId: id,
        userId: reqUser._id,
        message: "Photo liked successfully",
      });
    }
  } catch (error) {
    res.status(404).json({ errors: ["Photo not found"] });
  }
};

//comment photo

const commentPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const reqUser = req.user;

    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    const userComment = {
      comment,
      userName: user.name,
      userImage: user.image,
      userId: user._id,
    };

    photo.comments.push(userComment);

    await photo.save();

    res.status(200).json({
      comment: userComment,
      message: "Comment posted successfully",
    });
  } catch (error) {
    res.status(404).json({ errors: ["Photo not found"] });
  }
};

//Search photo

  const searchPhotos = async (req, res) => {
   try {

    const { q } = req.query;

  const photos = await Photo.find({ title: new RegExp(q, "i")}).exec();
  res.status(200).json(photos)

   } catch (error) {
    res.status(404).json({ errors: ["Error ocorred"] });
   }

};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
