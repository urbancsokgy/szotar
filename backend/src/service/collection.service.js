const Model = require('../model/collection.schema')


exports.addCollection = modelData => {
    const model = new Model(modelData)
    return model.save()
}
exports.count = (obj = {}) => Model.count(obj)
exports.findAll = () => Model.find().populate('owner')

exports.findOne = id => Model.findById(id).populate('owner')
exports.findWithFilter = (prop) => Model.find(prop).populate()
exports.update = (id, updateData) => 
    Model.findByIdAndUpdate(id, updateData, {new: true})

exports.delete = id => Model.findByIdAndDelete(id)