const UserService = require('../service/user.service')
const AddressService = require('../service/address.service')
const model = require('../model/user.schema')
const {deleteImage} = require('./image.delete')

exports.addUser = async (req, res, next) => {
  try {
    req.body.role = "user" 
    req.body.active = true
    req.body.avatar = (req.file?.originalname || 'default_avatar.webp')   
    const data = await UserService.addUser(req.body)
    return res.status(200).json({
      status: 200,
      message: "User created",
      firstname: data.firstName,
      lastname: data.lastName,
      email: data.email
    })
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
}
//--------------------
exports.createWithAddress = async (req, res, next) => {
  try {
    let address = { country: '', city: '', street: '', zip: '', building: '' }
    const body = req.body;    
    ['country', 'city', 'street', 'zip', 'building'].forEach(prop => 
      address[prop] = body[prop])
    const newAddress = await AddressService.addNewAddress(address)
    req.body.role = "user" 
    req.body.active = true
    let newUserData = {};
    ['firstName', 'lastName', 'street', 'email', 'password', 'role'].forEach( prop =>
      newUserData[prop] = body[prop])
    newUserData.address = newAddress._id
    newUserData.avatar = (req.file?.originalname || 'default_avatar.webp')
    newUserData.role = "user" 
    newUserData.active = true
    const newUser = await UserService.addUser(newUserData)
    return res.status(200).json(await UserService.findOne(newUser._id))
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message })
  }
}
//------------
exports.findAll = async (req, res, next) => {
  const users = await UserService.findAll()
  return res.json(users)

};
//------------
exports.findWithFilter = async (req, res, next) => {
  prop = req.query
  console.log("filtered", prop);
  const users = await UserService.findWithFilter(prop)
  return res.json(users)

};
//-------------------------
exports.basicdata = async (req, res, next) => {
  try {
    queryList = req.query
    const users = await UserService.findAll()
    const filteredData = users.map(data => {
      let filteredUser = {}
      let user = data.toJSON()
      Object.keys(queryList).forEach(key =>
        filteredUser[key]=user[key],
        )      
      filteredUser._id = user._id
      return filteredUser
    }
    )
    return res.json(filteredData)

  } catch (error) {
    console.log(error);
    return res.status(404).json({ status: 404, err: error.message })
  }
}
//-------------------
exports.finddById = async (req, res, next) => {
  try {
    const user = await UserService.findById(req.params.id)
    return res.json(user);
  }
  catch (error) {
    return res.status(404).json({ status: 404, err: error.message })
  }
};
//-----------------------
exports.findOne = async (req, res, next) => {
  try {
    const prop = req.body
    if (Object.keys(prop).length>0) {
      const user = await UserService.findOne(prop)
      let {email, password} = user
      return res.json({email, password});
    }
    else { return res.json({}) }
  }
  catch (error) {
    return res.status(404).json({ status: 404, err: error.message })
  }
};
//-----------------------
exports.update = async (req, res, next) => {
  try {
    updateData = req.body
    updateData.avatar = (req.file?.originalname || 'default_avatar.webp')
    originData = await UserService.findById(req.params.id)
    newData = { originData, ...updateData }
    responseData = await UserService.update(req.params.id, newData)
    return res.send(responseData)
  }
  catch (err) { return res.status(404).json({ status: 404, err: err.message }) }
};
//-------------------------
exports.count = async (req, res, next) => {
  try {
    const dataCount = await UserService.count()
    return res.json(dataCount)
  }
  catch (err) {
    return res.status(404).json({ status: 404, err: err.message })
  }
};
//--------------------
exports.delete = async (req, res, next) => {
  try {
    if (! await UserService.findById(req.params.id)) {
      throw 'user not exists'
    }
    // k??p t??rl??se
    data = await UserService.findById(req.params.id)
        imageName= data.avatar
        dir = "/public/img/avatar/"
        if(imageName != "default_avatar.webp"){
          deleteImage(dir, imageName)
        }
    // address t??rl??se
    currentAddress = data.address
    await UserService.delete(req.params.id)
    await AddressService.delete(currentAddress)
    
    return res.json({ message: "user deleted" })
  }
  catch (error) {
    return res.status(404).json({ status: "delete failed 404", message: error.message })
  }
};
