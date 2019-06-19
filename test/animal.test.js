const assert = require('assert')
const Animal = require('../components/animals/animal')
const Group = require('../components/groups/group')
let animal
let group

beforeEach(() => {
  group = new Group({name: 'Dog'})
  group.save()
  animal = new Animal({group: group._id, name: 'Todd' })
  animal.save()
})

describe('Creating documents', () => {
  it('creates a animal', (done) => {
    const group = new Group({ name: 'Cat' })
    const animal = new Animal({group: group._id, name: 'Todd' })

    group.save()
         .then(() => {
           animal.save()
           .then(() => {
             assert(!animal.isNew);
           })
           done()
         })
  })
})

describe('Reading animal details', () => {
  it('finds animal with the name of animal', (done) => {
    Animal.findOne({ name: 'Todd' })
          .then((animal) => {
            assert(animal.name === 'Todd')
            done()
          })
  })
})
