
const Record = require('../record')
const SEED_RECORD = require('./record.json')

const db = require('../../config/mongoose')


db.once('open', () => {
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