const FAKER_TYPE = {
  'String': {
    'address': [
      'city',
      'cityPrefix',
      'citySuffix',
      'streetName',
      'streetAddress',
      'streetSuffix',
      'streetPrefix',
      'secondaryAddress',
      'county',
      'country',
      'state',
      'stateAbbr',
      'latitude',
      'longitude'
    ],
    'name': [
      'firstName',
      'lastName',
      'findName',
      'jobTitle',
      'title',
      'jobDescriptor',
      'jobArea',
      'jobType',
      'prefix',
      'suffix'
    ],
    'commerce': [
      'color',
      'department',
      'productName',
      'price',
      'productAdjective',
      'productMaterial',
      'product'
    ],
    'company': [
      'suffixes',
      'companyName',
      'companySuffix',
      'catchPhrase',
      'bs',
      'catchPhraseAdjective',
      'catchPhraseDescriptor',
      'bsAdjective',
      'bsBuzz',
      'bsNoun'
    ],
    'datebase': [
      'column',
      'type',
      'collation',
      'engine'
    ],
    'date': [
      'past',
      'future',
      'between',
      'recent',
      'month',
      'weekday'
    ],
    'lorem': [
      'word',
      'words',
      'sentence',
      'sentences',
      'slug',
      'paragraph',
      'text',
      'lines'
    ],
    'finance': [
      'account',
      'accountName',
      'mask',
      'amount',
      'transactionType',
      'currencyCode',
      'currencyName',
      'currencySymbol',
      'bitcoinAddress',
      'iban',
      'bic'
    ],
    'internet': [
      'avatar',
      'email',
      'exampleEmail',
      'userName',
      'protocol',
      'url',
      'domainName',
      'domainSuffix',
      'domainWord',
      'ip',
      'ipv6',
      'userAgent',
      'color',
      'mac',
      'password'
    ],
    'system': [
      'fileName',
      'commonFileName',
      'mimeType',
      'fileType',
      'fileExt',
      'directoryPath',
      'filePath',
      'semver'
    ],
    'phone': [
      'phoneNumber',
      'phoneNumberFormat'
    ],
    'random': [
      'uuid',
      'word',
      'words',
      'locale'
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
