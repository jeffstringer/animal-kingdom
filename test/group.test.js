const assert = require('assert')
const Group = require('../components/groups/group')
let group

beforeEach(() => {
  group = new Group({name: 'Cat'})
  group.save()
})

describe('Creating documents', () => {
  it('creates a group', (done) => {
    const group = new Group({ name: 'Cat' })
    group.save()
         .then(() => {
           assert(!group.isNew);
           done()
         })
  })
})

describe('Reading group details', () => {
  it('finds group with the name of group', (done) => {
    Group.findOne({ name: 'Cat' })
         .then((group) => {
         assert(group.name === 'Cat')
           done()
         })
  })
})
