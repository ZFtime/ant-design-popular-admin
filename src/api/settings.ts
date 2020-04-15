import service from '@/utils/request'

/**
 * 获取职位列表
 * @return Promise
 */
export default function getPositionPageList (params: any) {
  return service({
    url: '/api/setting/positionList',
    method: 'POST',
    data: params
  })
}
