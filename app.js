const express = require('express')
const mongoose = require('mongoose')
const hbs = require('express-handlebars')

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
  res.render('index')
})

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.listen(port, () => {
  console.log(`Express is running on the http://localhost:${port}`)
})