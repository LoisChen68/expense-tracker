const express = require('express')
const app = express()

const port = 3000

app.get('/', (req, res) => {
  res.send('Declare war on the world.')
})

app.listen(port, () => {
  console.log(`Express is running on the http://localhost:${port}`)
})