/**
 * @author Administrator
 * @date 2021-03-04 16:48
 */

const { connection, Schema } = require('../database')
const mongoose = require('mongoose');

const UserSchema = Schema({ name: String, tel: String, isDefault: Boolean })

const UserModel = mongoose.model('User', UserSchema)

const query = (res, data, next) => {
  let { page = '1', limit = '10' } = data
  page = parseInt(page),
    limit = parseInt(limit)
  UserModel.find({}, function (err, docs) {
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
  UserModel.findById(data, function (err, docs) {
    if (err) return next(err)
    res.send(docs)
  })
}

const insert = (res, data, next) => {
  UserModel.create(data, function (err, docs) {
    if (err) return next(err)
    res.send(docs)
  })
}

const del = (res, data, next) => {
  UserModel.deleteOne(data, function (err, docs) {
    if (err) return next(err)
    res.send(docs)
  })
}

const update = (res, data, next) => {
  const { id, ...userInf } = data
  UserModel.updateOne({ _id: id }, userInf, function (err, docs) {
    if (err) return next(err)
    res.send(docs)
  })
}

module.exports = {
  UserModel,
  query,
  findById,
  insert,
  delete: del,
  update
}
