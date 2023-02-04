const ProductModel = require("../models/products")
const _ = require("lodash")
const Joi = require("joi")

const createProduct = function (req, res, next) {
  // if(isNaN(_.get(req,"body.price"))){
  //     return res.status(422).send({err:"price should be number"})
  // }

  const schema = Joi.object().keys({
    title: Joi.string().min(15).required(),
    price: Joi.number().required(),
  })

  const { error } = schema.validate(req.body)
  const errorDetails = _.get(error, "details", [])
  //   if (errorDetails.length != 0) {
  //     return res.send(errorDetails)
  //   }

  if (!_.isEmpty(errorDetails)) {
    return res.send(errorDetails)
  }

  //return res.send(_.get(error, "details", []))
  const product = new ProductModel(req.body)
  // product.title=req.body.title;
  // product.image=req.body.image;

  product.save(function (err, data) {
    if (err) {
      return res.status(422).send(err)
    }
    return res.send(data)
  })
  // return res.send({sucess:true, body:req.body,product:product})
}
const getProducts = function (req, res, next) {
  ProductModel.find({}, function (err, data) {
    // return res.send("iam from prodcuts controller m0ngoos")
    return res.send(data)
  })
}


const updateProduct = function (req, res, next) {
  const id = _.get(req, "params.id", null)
const body = _.get(req,'body',{})
  ProductModel.findByIdAndUpdate(id,body, function (err, data) {
    if (err) {
      return res.status(404).send(err)
    }
    return res.send(data)
  })
} 
const deleteProduct = function (req, res, next) {
  const id = _.get(req, "params.id", null)

  ProductModel.findByIdAndDelete(id, function (err, data) {
    if (err) {
      return res.status(404).send(err)
    }
    return res.send(data)
  })
}

const getProduct = function (req, res, next) {
  //   const id = req?.abcd?.id
  //const id = req && req.abcd && req.abcd.id
  //   let id ;
  //   if (req){
  //     if (req.abcd){
  //         if (req.abcd.id){
  //             id=req.abcd.id
  //         }
  //     }
  //   }
  // const id = _.get(req,"abcd.id",123)
  const id = _.get(req, "params.id", null)

  ProductModel.findById(id, function (err, data) {
    if (err) {
      return res.status(404).send(err)
    }
    return res.send(data)
  })
}

module.exports = { getProducts, getProduct, createProduct, updateProduct,deleteProduct }
