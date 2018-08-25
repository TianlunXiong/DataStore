const FAKER_TYPE = {
  'String': {
    'address': [
      'city',
      'streetName'
    ],
    'name': [
      'firstName',
      'lastName'
    ]
  },
  'Number': {
    'random': [
      'number'
    ]
  },
  'Boolean': {
    'random': [
      'boolean'
    ]
  }
}
export default {
  namespaced: true,
  state: {
    fakerType: FAKER_TYPE
  },
  actions: {

  },
  mutations: {

  }
}
