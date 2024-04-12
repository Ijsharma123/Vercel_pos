const multer = require('multer')
const path = require('path');


const profilePhoto = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "src/Images/ProfilePhoto")
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

exports.storeProfilePhoto = multer({
    storage: profilePhoto,
    fileFilter: function (req, file, cb) {

        switch (file.mimetype) {
            case 'image/jpg':
                cb(null, 'src/Images/ProfilePhoto');
                break;

            case 'image/jpeg':
                cb(null, 'src/Images/ProfilePhoto');
                break;
    
            case 'image/png':
                cb(null, 'src/Images/ProfilePhoto');
                //  cb('This is your Png file');
                break;
            
            default:
                cb('only jpg and png file supported and Image Size not Exceed 1 mb!');
                break;
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 1      /* 1 mb size */
    }
}).single('image')

