const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, `${process.cwd()}/public/img`);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// }); 
exports.imageUpload =(imagekey) => {
    const storage = multer.memoryStorage()
    const fileFilter = (req, file, cb) => {
        if ((file.mimetype).includes('jpeg')
            || (file.mimetype).includes('png')
            || (file.mimetype).includes('jpg')) {
            cb(null, true);
        } else {
            cb(null, false);
    
        }
    
    };
    let myupload = multer({ storage: storage, fileFilter: fileFilter, }).single(imagekey);
    
    return  async (req, res, next) => {        
        if (!storage) { return req.file.originalname = 'default.jpg' }
        else {
            try {
                await myupload(req, res, (err) => {
                    if (err) {
                        return res.status(400).send(err);
                    }
                    next()
                });
            } catch (error) {
                return res.json({ message: error.message })
            }
        }
        // req.file is the `avatar` file
        // req.body will hold the text fields, if there were any
    }
    
}