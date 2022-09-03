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
  const sort = req.query.sort
  const sortOption = {
    amountDesc: { amount: 'desc' },
    amountAsc: { amount: 'asc' },
    dateDesc: { date: 'desc' },
    dateAsc: { date: 'asc' }
  }
  const categories = await Category.find().lean()
  const records = await Record
    .find({ user_id: req.user._id })
    .populate('category_id')
    .sort(sortOption[sort])
    .lean()

  categories.map(categories => {
    if (categories.name == category) {
      categories.selected = 'selected'
    }
  })

  let { amountDesc_selected, amountAsc_selected, dateDesc_selected, dateAsc_selected } = ''
  if (sort === 'amountDesc') { amountDesc_selected = 'selected' }
  if (sort === 'amountAsc') { amountAsc_selected = 'selected' }
  if (sort === 'dateDesc') { dateDesc_selected = 'selected' }
  if (sort === 'dateAsc') { dateAsc_selected = 'selected' }

  const filterRecord = await records.filter(data => data.category_id.name.includes(category))

  let totalAmount = filterRecord.reduce((total, record) => {
    return total + Number(record.amount)
  }, 0)

  records.forEach(records => records.date = records.date.toLocaleDateString('zh-TW'))

  res.render('index', { records: filterRecord, totalAmount, categories, amountDesc_selected, amountAsc_selected, dateDesc_selected, dateAsc_selected })


})
module.exports = router