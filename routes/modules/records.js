const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/new', async (req, res) => {
  const categories = await Category.find().lean()
  return res.render('new', { categories })
})

router.post('/', async (req, res) => {
  const user_id = req.user._id
  const { name, date, category, amount } = req.body
  const categoryData = await Category.findOne({ name: category }).lean()
  await Record.create({ name, date, category_id: categoryData._id, amount, user_id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', async (req, res) => {
  const user_id = req.user._id
  const _id = req.params.id
  const categories = await Category.find().lean()
  const record = await Record.findOne({ _id, user_id }).populate('category_id').lean()

  categories.map(categories => {
    if (categories.name == record.category_id.name) {
      categories.selected = 'selected'
    }
  })

  record.date = record.date.toJSON().slice(0, 10)
  res.render('edit', { record, categories })
})

router.put('/:id', async (req, res) => {
  const user_id = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  const categoryData = await Category.findOne({ name: category }).lean()
  await Record.findOneAndUpdate({ _id, user_id }, { name, date, category_id: categoryData._id, amount })
  res.redirect('/')

})


router.delete('/:id', (req, res) => {
  const user_id = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, user_id })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router