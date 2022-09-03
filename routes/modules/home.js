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

router.get('/category', async (req, res) => {
  const category = req.query.category
  const categories = await Category.find().lean()
  const records = await Record
    .find({ user_id: req.user._id })
    .populate('category_id')
    .lean()

  categories.map(categories => {
    if (categories._id == category) {
      categories.selected = 'selected'
    }
  })

  const filterRecord = await records.filter(data => data.category_id._id.toString().includes(category))

  let totalAmount = filterRecord.reduce((total, record) => {
    return total + Number(record.amount)
  }, 0)

  records.forEach(records => records.date = records.date.toLocaleDateString('zh-TW'))

  res.render('index', { records: filterRecord, totalAmount, categories })


})
module.exports = router