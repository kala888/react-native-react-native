import _ from 'lodash'
import app from './app.model'

import ModelTools from './model-tools'
import niceRouter from '../nice-router/nice-router.model'

const modelListOOTB = [niceRouter, app, 'home']

const customizedModelList = []

let modelList = []
modelList = modelList.concat(modelListOOTB.filter((it) => _.isString(it)))
modelList = modelList.concat(customizedModelList.filter((it) => _.isString(it)))

modelList = modelList.concat(modelListOOTB.filter((it) => _.isObject(it)))
modelList = modelList.concat(customizedModelList.filter((it) => _.isObject(it)))

const modelContainer = {}
console.log('prepare to initial models from modelList', modelList)

_.forEach(modelList, (it) => {
  const nameSpace = _.isString(it) ? it : it.namespace

  let modelObj = ModelTools.createDefault(nameSpace)
  if (!_.isString(it)) {
    modelObj = _.merge(modelObj, it)
  }
  modelContainer[nameSpace] = modelObj
})
const models = _.values(modelContainer)
console.log('models of list:', models)

export default models
