const WordtypeService = require('../service/wordtype.service')
const model = require('../model/wordtype.schema')

// exports.addWordType = async (req, res, next) =>{
//     try {
//         const data = await WordtypeService.addWordType(req.body)
//         return res.status(200).json({
//             status: 200,
//             message: "wordType created",
//             data: {...data.toJSON()}
//         })
//     } catch (error) {
//         return res.status(400).json({ status: 400, message: error.message })
//     }
// }
exports.count = async (req, res, next) =>{
    try {
        const count = await WordtypeService.count()
        return res.json(count)        
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
exports.findAll = async (req, res, next) =>{
    try {
        return res.json(await WordtypeService.findAll())
       
    } catch (error) {
        return res.status(400).json({ status: 400, message: error.message })
    }
}
//------------
exports.findWithFilter = async (req, res, next) => {
    prop = req.query
    console.log("filtered", prop);
    const users = await WordtypeService.findWithFilter(prop)
    return res.json(users)
  
  };
exports.findOne = async (req, res, next) =>{
    try {
        data = await WordtypeService.findOne(req.params.id)
        return res.json(data)
    } catch (error) {
        return res.status(400).json({status: 400, error: error.message})
    }
}
// exports.update = async (req, res, next) =>{
//     try {
//         const oldData = await WordtypeService.findOne(req.params.id)
//         const updateData={...oldData.toJSON(), ...req.body}
//         data = await WordtypeService.update(req.params.id, updateData)
//         return res.json(data)
//     } catch (error) {
//         return res.status(400).json({status: 400, error: error.message})
//     }
// }
// exports.delete = async (req, res, next) =>{
//     try {
//         await WordtypeService.delete(req.params.id)
//         return res.status(200).json({status: 200, Message: "WordType item deleted"})
//     } catch (error) {
//         return res.status(400).json({status: 400, error: error.message})
//     }
// }