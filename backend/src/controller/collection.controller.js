const CollectionService = require('../service/collection.service')
const model = require('../model/collection.schema')

exports.addCollection = async (req, res, next) =>{
    try {
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
        const updateData={...oldData.toJSON(), ...req.body}
        data = await CollectionService.update(req.params.id, updateData)
        return res.json(data)
    } catch (error) {
        return res.status(400).json({status: 400, error: error.message})
    }
}
exports.delete = async (req, res, next) =>{
    try {
        await CollectionService.delete(req.params.id)
        return res.status(200).json({status: 200, Message: "Collection item deleted"})
    } catch (error) {
        return res.status(400).json({status: 400, error: error.message})
    }
}