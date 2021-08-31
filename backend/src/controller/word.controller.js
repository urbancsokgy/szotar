const WordService = require('../service/word.service')
const model = require('../model/word.schema')

exports.addWord = async (req, res, next) => {
    try {
        const data = req.body
        data.image_name = (req.file?.originalname || 'default.jpg')
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
exports.findAllBasic = async (req, res, next) => {
    try {
        return res.json(await WordService.findAllBasic())

    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
exports.findOne = async (req, res, next) => {
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
        await WordService.delete(req.params.id)
        return res.status(200).json({ status: 200, Message: "A word deleted" })
    } catch (error) {
        return res.status(400).json({ status: 400, error: error.message })
    }
}