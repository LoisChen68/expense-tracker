const Record = require('./models/record')
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

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records }))
    .catch(error => console.log(error))
})

app.get('/records/new', (req, res) => {
  return res.render('new')
})

app.post('/records', (req, res) => {
  const { name, date, amount } = req.body
  return Record.create({ name, date, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.listen(port, () => {
  console.log(`Express is running on the http://localhost:${port}`)
})