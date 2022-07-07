import request from '@/utils/request'

/* 登录接口 */
export function login (data) {
  // 返回一个promise对象
  return request({
    url: '/sys/login', // 因为所有接口都要跨域 表示所有的接口都要带/api
    method: 'POST',
    data
  })
}
