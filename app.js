'use strict'

const Group = require('./models/group')

const express = require('express')
const port = 3000
const app = express()

const mongoose = require('mongoose')
const mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoDB, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const assert = require('assert');

const dbName = 'animal-kingdom';

app.listen(port, () =>
  console.log(`listening on port ${port}`)
)

app.get('/groups', (req, res) => {
  Group.find({}, (err, groups) => {
    let groupMap = {}
    groups.forEach((group) => {
      groupMap[group._id] = group
    })
    res.send(groupMap)
  })
})

app.get('/groups/:id', (req, res) => {
  let id = req.params.id
  Group.findById(id, (err, group) => {
    if (err) {
      res.end(JSON.stringify({ response: 'there was an error' }))
    } else {
      res.send(group)
    }
  })
})

app.post('/groups', (req, res) => {
  let name = req.query.name
  let group = new Group({name: name})
  group.save()
       .then(() => {
         res.end(JSON.stringify({ response: `New group ${group.name} saved.` }))
         done()
       })
})

app.put('/groups/:id', (req, res) => {
  let id = req.params.id
  let name = req.query.name
  Group.findById(id, (err, group) => {
    if (err) {
      res.end(JSON.stringify({ response: 'there was an error' }))
    } else {
      let formerName = group.name
      group.name = name
      group.save()
            .then(() => {
              res.end(JSON.stringify({ response: `Group name changed from ${formerName} to ${group.name}.` }))
            })
    }
  })
})

app.delete('/groups/:id', (req, res) => {
  let id = req.params.id
  Group.findByIdAndDelete(id, (err, group) => {
    if (err) {
      res.end(JSON.stringify({ response: 'there was an error' }))
    } else {
      res.end(JSON.stringify({ response: `Group id ${id} was deleted.` }))
    }
  })
})
