const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

router.get('/', (req, res) => {
  const user_id = req.user._id
  Record.find({ user_id })
    .lean()
    .then(records => {

      records.forEach(records => records.date = records.date.toLocaleDateString())

      res.render('index', { records }
      )
    })
    .catch(error => console.log(error))
})

module.exports = router