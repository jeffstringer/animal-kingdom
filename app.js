'use strict'

const express = require('express')
const port = 3000
const app = express()

app.listen(port, () =>
  console.log(`listening on port ${port}`)
)

app.get('/', (req, res, next) => {
  res.end(JSON.stringify({ hello: 'world' }))
})
