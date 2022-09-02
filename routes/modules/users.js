const express = require('express')
const router = express.Router()
const passport = require('passport')

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出')
  res.redirect('/users/login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  User.findOne({ email }).then(user => {
    if (!user) {
      return User.create({
        name,
        email,
        password
      })
        .then(() => {
          req.flash('success_msg', '註冊成功，請輸入帳號密碼登入')
          res.redirect('/users/login')
        })
        .catch(error => console.log(error))
    }
    errors.push({ message: '此Email已被註冊' })
    res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  })
    .catch(error => console.log(error))
})

module.exports = router