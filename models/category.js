const mongoose = require('mongoose')
const Schema = mongoose.Schema


const categorySchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: false }
})


module.exports = mongoose.model('Category', categorySchema)