/**
 * @author Administrator
 * @date 2021-03-04 16:48
 */

const { Schema } = require('../database')
const mongoose = require('mongoose')

const GoodsSchema = Schema({ name: String, price: Number, location: String })

const GoodsModel = mongoose.model('Goods', GoodsSchema)

const query = (res, data, next) => {
  let { page = '1', limit = '10' } = data
  page = parseInt(page)
  limit = parseInt(limit)
  GoodsModel.find({}, function (err, docs) {
    if (err) return next(err)
    const { length } = docs
    res.send({
      list: docs.slice((page - 1) * limit, page * limit),
      pageInfo: {
        totalCount: length,
        totalPage: Math.ceil(length / limit),
        currentPage: page,
        limit
      }
    })
  })
}

const findById = (res, data, next) => {
  GoodsModel.findById(data, function (err, docs) {
    if (err) return next(err)
    res.send(docs)
  })
}

const insert = (res, data, next) => {
  GoodsModel.create(data, function (err, docs) {
    if (err) return next(err)
    res.send(docs)
  })
}

const del = (res, data, next) => {
  GoodsModel.deleteOne(data, function (err, docs) {
    if (err) return next(err)
    res.send(docs)
  })
}

const update = (res, data, next) => {
  const { id, ...userInf } = data
  GoodsModel.updateOne({ _id: id }, userInf, function (err, docs) {
    if (err) return next(err)
    res.send(docs)
  })
}

module.exports = {
  GoodsModel,
  query,
  findById,
  insert,
  delete: del,
  update
}
