const mongoose = require('mongoose')
const Record = require('../record')

const SEED_RECORD = require('./record.json')

mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  Promise.all(Array.from(SEED_RECORD, record => {
    const { name, date, amount } = record
    Record.create({
      name: record.name,
      date: record.date,
      amount: record.amount
    })
  }))
  console.log('Record seed created.')
})