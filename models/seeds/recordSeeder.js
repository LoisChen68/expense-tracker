const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Record = require('../record')
const User = require('../user')
const SEED_RECORD = require('./record.json')

const db = require('../../config/mongoose')

const SEED_USER = require('./user.json')


db.once('open', async () => {
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
        await Record.create({
          name: record.name,
          date: record.date,
          amount: record.amount,
          user_id: userData._id
        })
      }))
    console.log('Record & User seed created.')
    process.exit()
  }))
})