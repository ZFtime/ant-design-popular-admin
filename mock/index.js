const Mock = require('mockjs')

if (process.env.NODE_ENV === 'development') {
  require('./modules/settings')
  Mock.setup({
    timeout: '10-2500'
  })
}
