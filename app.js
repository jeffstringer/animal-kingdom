'use strict'

const Animal = require('./components/animals/animal')
const animalRoutes = require('./components/animals/animalRoutes')

const Group = require('./components/groups/group')
const groupRoutes = require('./components/groups/groupRoutes')

const express = require('express')
const router = express.Router()
const port = 3000
const app = express()

const mongoose = require('mongoose')
const mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoDB, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
const dbName = 'animal-kingdom';

app.listen(port, () =>
  console.log(`listening on port ${port}`)
)

// Groups Endpoints
app.use('/groups', router)
app.get('/groups', groupRoutes.index)
app.get('/groups/:id', groupRoutes.show)
app.post('/groups', groupRoutes.create)
app.put('/groups/:id', groupRoutes.update)
app.delete('/groups/:id', groupRoutes.destroy)

// Animals Endpoints
app.use('/animals', router)
app.get('/animals', animalRoutes.index)
app.get('/animals/:id', animalRoutes.show)
app.post('/animals', animalRoutes.create)
app.put('/animals/:id', animalRoutes.update)
