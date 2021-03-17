/**
 * @author Administrator
 * @date 2021-03-04 16:49
 */
const {dbUri} = require("../config")
const mongoose = require('mongoose');

const {Schema,Model} = mongoose

const connection = mongoose.connect(dbUri,{useUnifiedTopology:true,useNewUrlParser:true})

module.exports = {
  connection,
  Schema,
  Model
}
