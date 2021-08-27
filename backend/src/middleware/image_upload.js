const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${process.cwd()}/public/img`);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
}); 
const fileFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg')
        || (file.mimetype).includes('png')
        || (file.mimetype).includes('jpg')) {
        cb(null, true);
    } else {
        cb(null, false);

    }

};
let myupload = multer({ storage: storage, fileFilter: fileFilter,}).single('image');

exports.imageUpload =async (req, res, next) =>{
    try {
      await  myupload(req, res, (err) => {
            if(err) {
                return  res.status(400).send("Something went wrong!");
            }         
            next()
           // return data = req.file
          });        
    } catch (error) {
     return   res.json({message: error.message})
    }
    
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  }