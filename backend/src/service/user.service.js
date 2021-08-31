const Model = require('../model/user.schema')



exports.addUser = modelData => {
    const model = new Model(modelData)
    return model.save()
}
exports.count = (obj = {}) => Model.count(obj)
exports.findAll = () => Model.find().populate('address')

exports.findById = id => Model.findById(id).populate('address')
exports.findOne = prop => Model.findOne(prop)

exports.update = (id, updateData) => 
    Model.findByIdAndUpdate(id, updateData, {new: true})

exports.delete = id => Model.findByIdAndDelete(id)