const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  const records = await Record
    .find({ user_id: req.user._id })
    .populate('category_id')
    .lean()

  let totalAmount = records.reduce((total, record) => {
    return total + Number(record.amount)
  }, 0)

  records.forEach(records => records.date = records.date.toLocaleDateString('zh-TW'))

  res.render('index', { records, totalAmount, categories })
})

module.exports = router