const Model = require('../model/address.schema')
const UserService = require('../service/user.service')

exports.addNewAddress = modelData => {
    try {
        const model = new Model(modelData);
        return model.save()        
    } catch (error) {
        return error.message
    }
}
exports.count = () => Model.estimatedDocumentCount();
exports.findAll = () => Model.find().populate();

exports.findOne = id => Model.findById(id)

exports.update = (id, updateData) => 
    Model.findByIdAndUpdate(id, updateData, {new: true});

exports.delete = async id => {
    const address = await this.findOne(id)
    const addressID = address.toJSON()._id
    if (await UserService.count({address : addressID})>0){
        throw new Error('Address cannot be delete because it assigned a user') 
    }else{
      return await Model.findByIdAndDelete(id)
    }
}