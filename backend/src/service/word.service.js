const { Collection } = require('mongoose')
const Model = require('../model/word.schema')

populateFields = ['collection_name', 'wordclass',
{
    path: 'collection_name',
    model: 'Collection',
    populate : {
        path: 'owner',
        model: 'User',  
    }}]

exports.addWord = modelData => {
    const model = new Model(modelData)
    return model.save()
}
exports.count = (obj = {}) => Model.count(obj)
exports.findAll = () => Model.find().populate(populateFields)

exports.findOne = id => Model.findById(id).populate(populateFields)

exports.update = (id, updateData) => 
    Model.findByIdAndUpdate(id, updateData, {new: true})

exports.delete = id => Model.findByIdAndDelete(id)