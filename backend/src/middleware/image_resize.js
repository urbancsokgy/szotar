const sharp = require('sharp')
const fs = require('fs')

exports.resize = (size, dir) => {
   return  async (req, res, next)=>{
  size = (!size)? 800: size
  dir = (!dir)? "": `${dir}/`
  if(req.file!=undefined){
    let image = sharp(req.file.buffer);
    const myDate = new Date().toISOString().slice(0,20).split(':').join('.')
      .split('-').join('.')
      fileName= myDate+req.file.originalname.split('.').slice(0, -1).join('.').concat('.webp')
      newFile= `${process.cwd()}/public/img/${dir}${fileName}`
      newSize = 0
     
      await image
        .metadata()
        .then(function(metadata) {
            size = metadata.width>size? size: metadata.width;
            image
            .resize(size)           
            .webp()                   
            .toFile(newFile)
          })       
          
          req.file.originalname = fileName
          req.file.mimetype = "image/webp"
          req.file.buffer ={}
    }
      
    next()
  }
}
