const CollectionService = require('../service/collection.service')
const model = require('../model/collection.schema')
const WordService = require('../service/word.service')
const {deleteImage} = require('./image.delete')

exports.addCollection = async (req, res, next) =>{
    try {
        req.body.image_name = (req.file?.originalname || 'default_collection.webp')
        const data = await CollectionService.addCollection(req.body)
        return res.status(200).json({
            status: 200,
            message: "collection created",
            data: {...data.toJSON()}
        })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
exports.count = async (req, res, next) =>{
    try {
        const count = await CollectionService.count()
        return res.json(count)        
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
exports.findAll = async (req, res, next) =>{
    try {
        const collections = await CollectionService.findAll()
        return res.json(collections)
       
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
//------------
exports.findWithFilter = async (req, res, next) => {
    prop = req.query
    console.log("filtered", prop);
    const users = await CollectionService.findWithFilter(prop)
    return res.json(users)
  
  };
exports.findOne = async (req, res, next) =>{
    try {
        data = await CollectionService.findOne(req.params.id)
        return res.json(data)
    } catch (error) {
        return res.status(400).json({status: 400, error: error.message})
    }
}
exports.update = async (req, res, next) =>{
    try {
        const oldData = await CollectionService.findOne(req.params.id)
        updateData = req.body
        updateData.image_name = (req.file?.originalname || 'default_collection.webp')
        const updateData={...oldData.toJSON(), ...updateData}
        data = await CollectionService.update(req.params.id, updateData)
        return res.json(data)
    } catch (error) {
        return res.status(400).json({status: 400, error: error.message})
    }
}
exports.delete = async (req, res, next) =>{
    try {
        // Van-e szó a gyűjteményben?
        const word = await WordService.findWithProperty({collection_name: req.params.id})
        if(word == null){
            data = await CollectionService.findOne(req.params.id)    
            imageName= data.image_name
            dir = "/public/img/collection/"
            deleteImage(dir, imageName)
            await CollectionService.delete(req.params.id)
            return res.status(200).json({status: 200, Message: "Collection item deleted"})
        }else{
            return res.send("A kollekció nem törölhető, mert használatban van.")
        }
        
    } catch (error) {
        return res.status(400).json({status: 400, error: error.message})
    }
}