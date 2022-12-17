const multer = require('multer');
const path = require('path');

//Destination

const imageStorage = multer.diskStorage({
    destination: function (req, file , cb) {
        let folder = "";
        console.log(req.originalUrl);

        if (req.originalUrl.includes("users")) {
            folder = "users";
        } else if (req.originalUrl.includes("photos")) {
            folder = "photos";
        }

        cb ( null, path.resolve(__dirname, '..', `uploads/${folder}` ))
    },
    filename: (req, file, cb) =>{

        cb(null, Date.now() + path.extname(file.originalname))

    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file , cb ) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {

            return cb(new Error("Invalid file"))

        }

        cb ( undefined, true)
    }
})


module.exports = { imageUpload }