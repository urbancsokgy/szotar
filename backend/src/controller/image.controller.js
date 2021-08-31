const path = require('path');
const sharp = require('sharp');
require('dotenv').config()


exports.myUpload = async (req, res) => {
    //-------------------------
    const fileName = req.file?.filename || ''
    const filePath = req.file?.path || ''
    const file = `${filePath}`

    console.log('Myupload works')
    imagedata = req.file?.originalname
    res.json(imagedata || 'default.jpg')
}

exports.getFile = async (req, res) => {
    console.log("Get file");
    const filename = req.body.filename
    const file = `../../public/img/${filename}`
    //res.download(file); // Set disposition and send it.
    res.sendFile(path.resolve(__dirname, file))
}

exports.getUrl = async (req, res) => {
    console.log("Get fileURL");
    const filename = req.body.filename
    const file = `../../public/img/${filename}`
    //res.download(file); // Set disposition and send it.
    res.json(`${process.env.SERVER_URL}:${process.env.PORT || 3000}/img/${filename}`)
}