const WordService = require('../service/word.service')
const model = require('../model/word.schema')
const {deleteImage} = require('./image.delete')

exports.addWord = async (req, res, next) => {
    try {
        const data = req.body
        data.image_name = (req.file?.originalname || 'default.webp')
        await WordService.addWord(data)
        return res.status(200).json({ ...data })
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
exports.count = async (req, res, next) => {
    try {
        const count = await WordService.count()
        return res.json(count)
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
exports.findAll = async (req, res, next) => {
    try {
        return res.json(await WordService.findAll())

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
//------------
exports.findWithFilter = async (req, res, next) => {
    prop = req.query
    console.log("filtered", prop);
    const users = await WordService.findWithFilter(prop)
    return res.json(users)  
  };
exports.findAllBasic = async (req, res, next) => {
    try {
        return res.json(await WordService.findAllBasic())

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
exports.findWithProperty = async (req, res, next) => {
    console.log("findwithProperty", req.body);
    try {
        data = await WordService.findWithProperty(req.body)
        return res.json(data)
    } catch (error) {
        return res.status(400).json({ status: 400, error: error.message })
    }
}
exports.findOne = async (req, res, next) => {
    console.log("findById");
    try {
        data = await WordService.findOne(req.params.id)
        return res.json(data)
    } catch (error) {
        return res.status(400).json({ status: 400, error: error.message })
    }
}

exports.update = async (req, res, next) => {
    try {
        const oldData = await WordService.findOne(req.params.id)
        let  updateData={}
        image_name = (req.file?.originalname ||oldData.image_name)
        updateData = { ...oldData.toJSON(), ...req.body ,image_name}
        data = await WordService.update(req.params.id, updateData)
        return res.json(data)
    } catch (error) {
        return res.status(400).json({ status: 400, error: error.message })
    }
}
exports.delete = async (req, res, next) => {
    try {
        data = await WordService.findOne(req.params.id)
        imageName= data.image_name
        dir = "/public/img/"
        deleteImage(dir, imageName)
        await WordService.delete(req.params.id)
        return res.status(200).json({ status: 200, Message: "A word deleted" })
    } catch (error) {
        return res.status(400).json({ status: 400, error: error.message })
    }
}

