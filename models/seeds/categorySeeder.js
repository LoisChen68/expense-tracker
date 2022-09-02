if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const Category = require('../category')

const categoryJson = require('./category.json')



db.once('open', async () => {
  await Category.create(categoryJson)
  console.log('category seed created.')
  process.exit()
})