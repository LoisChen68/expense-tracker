const Record = require('./models/record')
const express = require('express')
const methodOverride = require('method-override')

const hbs = require('express-handlebars')
const routes = require('./routes')

const app = express()

require('./config/mongoose')



const port = 3000

app.use(express.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))

app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on the http://localhost:${port}`)
})