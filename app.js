const express = require('express')
const session = require('express-session')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const hbs = require('express-handlebars')

const app = express()
const PORT = process.env.PORT || 3000

const routes = require('./routes')

const usePassport = require('./config/passport')
require('./config/mongoose')

app.use(express.static('public'))


app.engine('hbs', hbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'Secret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Express is running on the http://localhost:${PORT}`)
})