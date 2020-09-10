import { Dimensions } from 'react-native'
import { isEmpty, isNotEmpty } from '@/nice-router/nice-router-util'
import _ from 'lodash'
import GlobalToast from '@/nice-router/global-toast'

export function enrichListOfEntity({ dataContainer, targetList = [], root = {} }, ...names) {
  let refsEntityContainer = dataContainer
  if (!refsEntityContainer) {
    refsEntityContainer = root.dataContainer
  }
  if (!refsEntityContainer || (isEmpty(refsEntityContainer) && isNotEmpty(targetList))) {
    console.log('data container is empty, and target is not empty, return itself')
    return targetList
  }
  const doEnrichment = (list) => list.map((ref) => refsEntityContainer[ref.id]).filter((it) => it)
  if (names.length === 0) {
    return targetList ? doEnrichment(targetList) : []
  }
  const tempObj = {}
  _.forEach(names, (it) => {
    const list = root[it] || []
    if (list.length > 0) {
      tempObj[it] = doEnrichment(list)
    }
  })
  return tempObj
}

export function transToDate(value) {
  const dateValue = new Date(value)
  const ifDateType = dateValue instanceof Date && !_.isNaN(dateValue)
  return ifDateType ? dateValue : null
}

function dateFormat(time, fmt) {
  const values = {
    'M+': time.getMonth() + 1, //月份
    'd+': time.getDate(), //日
    'D+': time.getDate(), //日
    'H+': time.getHours(), //小时
    'h+': time.getHours() % 12, //小时
    'm+': time.getMinutes(), //分
    's+': time.getSeconds(), //秒
    'q+': Math.floor((time.getMonth() + 3) / 3), //季度
    S: time.getMilliseconds(), //毫秒
  }
  if (/([y,Y]+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const key in values) {
    if (new RegExp('(' + key + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? values[key] : ('00' + values[key]).substr(('' + values[key]).length)
      )
    }
  }
  return fmt
}

export function formatTime(time, fmt = 'yyyy-MM-dd') {
  if (time) {
    return dateFormat(new Date(time), fmt)
  }
  return ''
}

export function formatMoney(money, fixed = 2) {
  if (isEmpty(money)) {
    return ''
  }
  if (_.isNumber(money)) {
    const reg = fixed === 0 ? /\d(?=(\d{3})+$)/g : /\d(?=(\d{3})+\.)/g
    return money.toFixed(0).replace(reg, '$&,')
  }
  return money
}

export function removeOrPush(list = [], item, withClone = false) {
  const result = withClone ? _.clone(list) : list
  const target = _.remove(result, item)
  if (target.length === 0) {
    result.push(item)
  }
  return result
}

export function showMessage(resp = {}) {
  const message = _.get(resp, 'message', '')
  const hasMessage = isNotEmpty(message)
  if (hasMessage) {
    GlobalToast.show({ text: message })
  }
  return hasMessage
}

export const units = {
  vw: Dimensions.get('window').width / 100,
  vh: Dimensions.get('window').height / 100,
}
