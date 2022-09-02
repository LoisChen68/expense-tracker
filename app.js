const Record = require('./models/record')
const express = require('express')
const methodOverride = require('method-override')

const hbs = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3000

const routes = require('./routes')
require('./config/mongoose')

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on the http://localhost:${PORT}`)
})