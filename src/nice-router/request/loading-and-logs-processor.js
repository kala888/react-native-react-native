import GlobalToast from '@/nice-router/global-toast'
import { isNotEmpty, LoadingType } from '@/nice-router/nice-router-util'
import OverlayLoading from '@/nice-router/overlay-loading'
import ViewMappingService from '@/nice-router/viewmapping.service'

const systemErrorXClass = 'NetworkException.RetryPage'

function showLoading(loading) {
  if (loading === LoadingType.modal) {
    OverlayLoading.showLoadingModal()
  }
  // if (loading === LoadingType.barLoading) {
  //   Toast.loading(content, duration, onClose, mask)
  // }
}

async function hideLoading(loading) {
  if (loading === LoadingType.modal) {
    OverlayLoading.hideLoadingModal()
  }
  // if (loading === LoadingType.barLoading) {
  //   Taro.hideNavigationBarLoading()
  // }
}

function showError({ xclass, data = {} }) {
  console.warn('request got error,log it,', xclass, data)

  const view = ViewMappingService.getView(xclass)
  // 系统错误，根据xclass跳转页面
  if (xclass === systemErrorXClass || isNotEmpty(view)) {
    return
  }

  const { localizedMessage, messageList = [], message } = data

  const text = localizedMessage || message || messageList.map((msg) => msg.body).join('\n')
  if (isNotEmpty(text)) {
    GlobalToast.show({ text, duration: 5000 })
    return
  }
  // 开发环境，如果没有配置 本地错误，
  if (process.env.NODE_ENV === 'development') {
    GlobalToast.show({
      text: `开发环境：错误信息:${JSON.stringify(data)}`,
      duration: 5000,
    })
  }
}

const LoadingAndLogsProcessor = async (ctx, next) => {
  const { loading } = ctx.req.options
  showLoading(loading)
  await next()
  await hideLoading(loading)

  const { res } = ctx
  const { headers = {}, success, data } = res
  if (!success) {
    showError(res)
  }
  if (__DEV__) {
    console.log('%c****************************', 'color:#40aad8')
    console.log('%c*  request Option:', 'color:#40aad8', ctx.req)
    console.log('')
    console.log('%c*  X-Class:', 'color:#40aad8', headers['x-class'])
    console.log('%c*  X-Env-Type:', 'color:#40aad8', headers['x-env-type'])
    console.log('%c*  JSON Data:', 'color:#40aad8', data)
    console.log('%c****************************', 'color:#40aad8')
  }
}

export default LoadingAndLogsProcessor
