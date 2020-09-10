import _ from 'lodash'

const TARO_PROTOCOL_PRIFIX = 'page://'
export const LoadingType = {
  none: 100,
  top: 1,
  modal: 2,
  fetchingNext: 3,
  barLoading: 4,
}

export const createAction = (type) => (payload) => ({ type, payload })
export const noop = () => {}

export const sleep = async (longTime) => new Promise((resolve) => setTimeout(resolve, longTime))

export function log(...params) {
  console.log('%c nice-router: ', 'color:#8add4c; text-shadow: 0.5px 0.5px 0.5px grey', ...params)
}

// null=> true
// true=> true
// 1 => false
// [1,2]=> false
// {} => true
// {a:'1'} => false
export const isEmpty = (value) => {
  if (_.isNumber(value) || _.isBoolean(value)) {
    return false
  }
  return _.isEmpty(value)
}
export const isNotEmpty = (value) => {
  return !isEmpty(value)
}
export const toBoolean = (value) => {
  if (isEmpty(value)) {
    return false
  }
  if (_.isString(value)) {
    const p = value.toLowerCase().trim()
    if (p === 'true') {
      return true
    }
    if (p === 'false') {
      return false
    }
  }
  return value
}

function trimProtocal(uri = '') {
  const str = uri.trim()
  const idx = str.indexOf(TARO_PROTOCOL_PRIFIX)
  if (idx > -1) {
    return str.slice(idx + 7)
  }
  return str
}

export function toTaroUrl(uri = '', params) {
  const url = trimProtocal(uri)
  if (isNotEmpty(params)) {
    const postFix = _.map(params, (key, value) => key + '=' + value).join('&')
    if (uri.indexOf('?') > -1) {
      return `${url}&${postFix}`
    }
    return `${url}?${postFix}`
  }
  return url
}

/**
 *
 * @param uri 以/开头
 * @returns {{params: {}, pathname: (string|string)}}
 */
export function parseTaroUri(uri = '') {
  const url = trimProtocal(uri)
  const urlData = url.split('?')
  let params = {}
  if (urlData.length > 1) {
    const strAry = _.split(urlData[1], '&').map((i) => i.split('='))
    params = _.fromPairs(strAry)
  }
  const page = urlData[0]
  return {
    pathname: page,
    params,
  }
}

export function isLocalPagePath(uri = '') {
  return uri.trim().startsWith(TARO_PROTOCOL_PRIFIX)
}
