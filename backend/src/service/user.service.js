const Model = require('../model/user.schema')

exports.addUser = modelData => {
    const model = new Model(modelData);
    return model.save()
}
exports.count = () => Model.estimatedDocumentCount();
exports.findAll = () => Model.find().populate();

exports.findOne = id => Model.findById(id)

exports.update = (id, updateData) => 
    Model.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = id => Model.findByIdAndDelete(id)