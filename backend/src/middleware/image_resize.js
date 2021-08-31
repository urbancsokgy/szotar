const sharp = require('sharp')
const fs = require('fs')

exports.resize = async (req, res, next)=>{
  if(req.file!=undefined){
    let image = sharp(req.file.buffer);
    const myDate = new Date().toISOString().slice(0,20).split(':').join('.')
      .split('-').join('.')
      fileName= myDate+req.file.originalname.split('.').slice(0, -1).join('.').concat('.webp')
      newFile= `${process.cwd()}/public/img/${fileName}`
      newSize = 0
     
      await image
        .metadata()
        .then(function(metadata) {
            size = metadata.width>800? 800: metadata.width;
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
