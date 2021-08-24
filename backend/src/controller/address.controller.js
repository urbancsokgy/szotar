const AddressService = require('../service/address.service')
const model = require('../model/address.schema')

exports.addNewAddress = async (req, res, next) => {
  try {    
    const data = await AddressService.addNewAddress(req.body)
    return res.status(200).json({
      status: 200, 
      // ...req.body     
      message : "create success"
    })
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
}
//------------
exports.findAll = async (req, res, next) => {
  const addresses = await AddressService.findAll()
  return res.json(addresses)

};
//-------------------------
exports.basicdata = async (req, res, next) => {
  try {
    queryList = req.query
    const addresses = await AddressService.findAll()
    const filteredData = addresses.map(data => {
      let filter = {}
      for (let key in queryList) {
        let addressKeys = Object.keys(data.toJSON())
        if (addressKeys.includes(key)) {
          filter[key] = data[key]
        }
      }
      filter._id = data._id
      return filter
    }
    )
    return res.json(filteredData)

  } catch (error) {
    return res.status(404).json({ status: 404, err: error.message })
  }
}
//-------------------
exports.findOne = async (req, res, next) => {
  try {
    const user = await AddressService.findOne(req.params.id)
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
    originData = await AddressService.findOne(req.params.id)
    newData = { originData, ...updateData }
    responseData = await AddressService.update(req.params.id, newData)
    return res.send(responseData)
  }
  catch (err) { return res.status(404).json({ status: 404, err: err.message }) }
};
//-------------------------
exports.count = async (req, res, next) => {
  try {
    const dataCount = await AddressService.count()
    return res.json(dataCount)
  }
  catch (err) {
    return res.status(404).json({ status: 404, err: err.message })
  }
};
//--------------------
exports.delete = async (req, res, next) => {
  try {
    if( ! await AddressService.findOne(req.params.id)){
       throw 'address not exists'}
       await AddressService.delete(req.params.id)
    return res.json({message: "address deleted"})
  }
  catch (error) {
    console.error(error);
    return res.status(404).json({ status: "delete failed 404", message: error.message })
  }
};