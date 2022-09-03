const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
const SEED_RECORD = require('./record.json')

const db = require('../../config/mongoose')

const SEED_USER = require('./user.json')


db.once('open', async () => {
  const categories = await Category.find().lean()

  await Promise.all(SEED_USER.map(async user => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    const userData = await User.create({
      name: user.name,
      email: user.email,
      password: hash
    })
    await Promise.all(
      SEED_RECORD.map(async record => {
        const categoryData = categories.find(category => category.name === record.category_name)
        await Record.create({
          name: record.name,
          date: record.date,
          amount: record.amount,
          category_id: categoryData._id,
          user_id: userData._id
        })
      }))
    console.log('Record & User seed created.')
    process.exit()
  }))
})