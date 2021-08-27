const  path = require('path');
exports.myUpload = async (req, res) => {
    console.log('Myupload works')
    imagedata = req.file
    res.send(imagedata.filename)
}

  exports.getFile = async (req, res) => {
      console.log("Get file");
      const filename=req.body.filename
      const file = `../../public/img/${filename}`
      //res.download(file); // Set disposition and send it.
      res.sendfile(path.resolve(__dirname,file))
  }