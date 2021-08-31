const  path = require('path');
const sharp = require('sharp');

exports.myUpload = async (req, res) => {
    //-------------------------
    const fileName=req.file.filename
    const filePath=req.file.path
    const file = `${filePath}`

    console.log('Myupload works')
    console.log(req.body);
    imagedata = req.file
    res.send(imagedata)
}

  exports.getFile = async (req, res) => {
      console.log("Get file");
      const filename=req.body.filename
      const file = `../../public/img/${filename}`
      //res.download(file); // Set disposition and send it.
      res.sendFile(path.resolve(__dirname,file))
  }