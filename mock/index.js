import Mock from 'mockjs'

Mock.setup({
  timeout: '10-2500'
})

Mock.mock(/\/user/, {
  info: {
    name: Mock.Random.cname(),
    'age|12-38': 1,
    'sex|1': ['male', 'female']
  }
})
