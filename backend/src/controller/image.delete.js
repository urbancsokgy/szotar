const fs = require('fs')

exports.deleteImage = async (dir, imageName) =>{
    try {
        //console.log(dir, imageName, "----------------------");
       return await fs.unlinkSync(`${process.cwd()}${dir}${imageName}`)
    } catch (error) {
        return console.log("Image delete error", error);
    }
}