const express = require('express')
const mongoose = require('mongoose')
const app = express()
mongoose.connect(process.env.MONGODB_URI)

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const port = 3000

app.get('/', (req, res) => {
  res.send('Declare war on the world.')
})

app.listen(port, () => {
  console.log(`Express is running on the http://localhost:${port}`)
})