import _ from 'lodash'
import NiceRouter from './nice-router'
import { isEmpty, log } from './nice-router-util'

const POINTER = {}
const ViewMappingService = {
  getView(backendKey = '', stageInPage = false) {
    const key = _.trim(backendKey)
    let view = NiceRouter.config.viewConfig[key]
    if (isEmpty(view)) {
      const shortKey = key.substr(key.lastIndexOf('.') + 1, key.length)
      log('the key for class', key, 'not found, try to map with shortKey', shortKey)
      view = NiceRouter.config.viewConfig[shortKey] || {}
    }
    if (Array.isArray(view)) {
      const pointer = _.get(POINTER, backendKey, -1)
      const nextPageIndex = stageInPage ? pointer : pointer + 1 >= view.length ? 0 : pointer + 1
      POINTER[backendKey] = nextPageIndex
      return view[nextPageIndex]
    }
    return view
  },
}

export default ViewMappingService
