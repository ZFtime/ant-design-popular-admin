const Mock = require('mockjs')
const Random = Mock.Random
const dataList = []
for (let i = 0; i <= 50; i++) {
  dataList.push(Mock.mock({
    'id': Random.increment(),
    'positionNo': Mock.mock('@id()'),
    'positionCode': Mock.mock('@guid()'),
    'positionName': Mock.mock('@cname()'),
    'positionSerial': Mock.mock('@increment'),
    'status|0-1': 1,
    'time': Random.datetime()
  }))
}
// 分页接口
Mock.mock('/api/setting/positionList', 'post', (params) => {
  const body = JSON.parse(params.body)
  const [start, size, total] = [body.start, body.size, dataList.length]
  const currentData = dataList.slice((start - 1) * size, start * size)
  return {
    rel: true,
    status: 200,
    msg: 'success',
    data: { total: total, rows: currentData }
  }
})
