const ViewmappingConfig = {
  // global pages
  'com.terapico.caf.viewcomponent.GenericPage': [
    {
      pageName: 'Genericpage',
      stateAction: 'genericpage/save',
    },
    {
      pageName: 'Genericpage2',
      stateAction: 'genericpage2/save',
    },
  ],
  'com.terapico.caf.viewcomponent.GenericFormPage': {
    pageName: 'Genericform',
    stateAction: 'genericform/save',
  },
  'com.terapico.appview.ListOfPage': [
    {
      pageName: 'ListofPage',
      stateAction: ['listofpage/save', 'listofpage2/clear'],
    },
    {
      pageName: 'ListofPage2',
      stateAction: ['listofpage2/save', 'listofpage3/clear'],
    },
    {
      pageName: 'ListofPage3',
      stateAction: ['listofpage3/save', 'listofpage4/clear'],
    },
    {
      pageName: 'ListofPage4',
      stateAction: ['listofpage4/save', 'listofpage/clear'],
    },
  ],

  'com.terapico.appview.MePage': {
    pageName: 'MePage',
    stateAction: 'me/save',
  },
  LoginForm: {
    pageName: 'LoginPage',
    stateAction: 'app/logout',
  },
  'com.terapico.appview.HomePage': {
    pageName: 'HomePage',
    stateAction: 'home/save',
  },

  // end global pages
}

export default ViewmappingConfig
