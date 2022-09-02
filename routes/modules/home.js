const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  const user_id = req.user._id
  Record.find({ user_id })
    .lean()
    .then(records => {

      let totalAmount = records.reduce((total, record) => {
        return total + Number(record.amount)
      }, 0)

      records.forEach(records => records.date = records.date.toLocaleDateString('zh-TW'))

      res.render('index', { records, totalAmount }
      )
    })
    .catch(error => console.log(error))
})

module.exports = router