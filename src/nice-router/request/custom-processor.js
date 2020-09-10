import _ from 'lodash'
import GlobalToast from '@/nice-router/global-toast'

const systemErrorXClass = 'NetworkException.RetryPage'

const CustomProcessor = async (ctx, next) => {
  try {
    await next()
    const { data, response } = ctx.res
    const { headers: headersMap, statusText, status } = response
    const headers = headersMap.map

    const xclass = _.get(headers, 'x-class', '')
    const xredirect = _.get(headers, 'x-redirect', '')
    // 返回response的body是对象，并且xclass不是Exception结尾，那么应该就是正常 biz的数据
    const success = _.isObjectLike(data) && !xclass.endsWith('Exception')
    ctx.res = {
      xclass,
      xredirect,
      data,
      message: statusText,
      status,
      success,
      headers,
    }
  } catch (error) {
    console.warn('processor,Request error', error)
    GlobalToast.show({ text: '网络异常，请稍后再试' })
    ctx.res = {
      xclass: systemErrorXClass,
      message: `error code:${JSON.stringify(error)}`,
      success: false,
      data: {
        ...(error.response || {}),
      },
    }
  }
}

export default CustomProcessor
