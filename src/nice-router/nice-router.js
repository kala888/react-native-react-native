import _ from 'lodash'
import NavigationService from './navigation-service'

const defaultViewConfig = {
  'com.terapico.appview.H5Page': {
    pageName: 'H5Page',
    stateAction: 'H5page/save',
  },
  'NetworkException.RetryPage': {
    pageName: 'NetworkErrorPage',
  },
}

const defaultConfig = {
  baseURL: '',
  version: 1,
  appType: 'nice-router-taro',
  api: {},
  viewConfig: defaultViewConfig,
  backendRouterPageBlackList: [],
  backendRouterPageKeyBlackList: [],
}

const NiceRouterStatus = {
  initial: 0,
  done: 1,
}

const NiceRouter = {
  config: {},
  status: NiceRouterStatus.initial,
}

NiceRouter.start = ({ config = {}, dispatch }) => {
  NavigationService.setDispatch(dispatch)

  NiceRouter.config = _.merge(defaultConfig, config)

  const tempViewConfig = {}
  const vcfg = NiceRouter.config.viewConfig
  Object.keys(vcfg).map((key) => {
    tempViewConfig[key.trim()] = vcfg[key]
  })
  NiceRouter.config.viewConfig = tempViewConfig

  NiceRouter.status = NiceRouterStatus.done

  return NiceRouter
}

export default NiceRouter
