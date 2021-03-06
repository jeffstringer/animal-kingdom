const mongoose = require('mongoose')
const Group = require('./group')
const Animal = require('../animals/animal')

exports.index = (req, res) => {
  Group.find({}, (err, groups) => {
    let groupMap = {}
    groups.forEach((group) => {
      groupMap[group._id] = group
    })
    res.send(groupMap)
  })
}

exports.indexAnimals = (req, res) => {
  groupId = req.params.id
  Animal.find({group: groupId}, (err, animals) => {
          if (err) {
            res.end(JSON.stringify({ response: 'there was an error' }))
          } else {
            let animalMap = {}
            animals.forEach((animal) => {
              animalMap[animal._id] = animal
            })
            res.send(animalMap)
          }
        })
}

exports.show = (req, res) => {
  let id = req.params.id
  Group.findById(id, (err, group) => {
    if (err) {
      res.end(JSON.stringify({ response: 'there was an error' }))
    } else {
      res.send(group)
    }
  })
}

exports.create = (req, res) => {
  let name = req.query.name
  let group = new Group({name: name})
  group.save()
       .then(() => {
         res.end(JSON.stringify({ response: `New group ${group.name} saved.` }))
         done()
       })
}

exports.update = (req, res) => {
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
              res.end(JSON.stringify({ response: `Group name updated from ${formerName} to ${group.name}.` }))
            })
    }
  })
}

exports.destroy = (req, res) => {
  let id = req.params.id
  Group.findByIdAndDelete(id, (err, group) => {
    if (err) {
      res.end(JSON.stringify({ response: 'there was an error' }))
    } else {
      res.end(JSON.stringify({ response: `Group id ${id} was deleted.` }))
    }
  })
}
