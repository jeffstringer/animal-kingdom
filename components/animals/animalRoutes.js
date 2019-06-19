const mongoose = require('mongoose')
const Animal = require('./animal')

exports.index = (req, res) => {
  Animal.find({}, (err, animals) => {
    let animalMap = {}
    animals.forEach((animal) => {
      animalMap[animal._id] = animal
    })
    res.send(animalMap)
  })
}

exports.show = (req, res) => {
  let id = req.params.id
  Animal.findById(id, (err, animal) => {
    if (err) {
      res.end(JSON.stringify({ response: 'there was an error' }))
    } else {
      res.send(animal)
    }
  })
}

exports.create = (req, res) => {
  let animalName = req.query.name
  let groupId = req.query.groupId
  let animal = new Animal({group: groupId, name: animalName})
  animal.save()
       .then(() => {
         res.end(JSON.stringify({ response: `New animal ${animal.name} saved.` }))
         done()
       })
}

exports.update = (req, res) => {
  let id = req.params.id
  let name = req.query.name
  Animal.findById(id, (err, animal) => {
    if (err) {
      res.end(JSON.stringify({ response: 'there was an error' }))
    } else {
      let formerName = animal.name
      animal.name = name
      animal.save()
            .then(() => {
              res.end(JSON.stringify({ response: `Animal name updated from ${formerName} to ${animal.name}.` }))
            })
    }
  })
}
