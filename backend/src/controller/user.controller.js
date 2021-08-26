const UserService = require('../service/user.service')
const AddressService = require('../service/address.service')
const model = require('../model/user.schema')

exports.addUser = async (req, res, next) => {
  try {
    req.body.role = "user"
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
    let newUserData = {};
    ['firstName', 'lastName', 'street', 'email', 'password', 'role'].forEach( prop =>
      newUserData[prop] = body[prop])
    newUserData.address = newAddress._id
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
exports.findOne = async (req, res, next) => {
  try {
    const user = await UserService.findOne(req.params.id)
    return res.json(user);
  }
  catch (error) {
    return res.status(404).json({ status: 404, err: error.message })
  }
};
//-----------------------
exports.update = async (req, res, next) => {
  try {
    updateData = req.body
    originData = await UserService.findOne(req.params.id)
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
    if (! await UserService.findOne(req.params.id)) {
      throw 'user not exists'
    }
    await UserService.delete(req.params.id)
    return res.json({ message: "user deleted" })
  }
  catch (error) {
    return res.status(404).json({ status: "delete failed 404", message: error.message })
  }
};