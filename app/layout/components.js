
var components = {
  
  // page examples
  layouts: {
  
    layout6: {
      title: '06.输入交易密码',
      component: require('../layout/layout6'),
    },
    
    layout7: {
      title: '07.付款结果',
      component: require('../layout/layout7'),
    },
    
    layout8: {
      title: '08.密码',
      component: require('../layout/layout8'),
    },
    
    layout9: {
      title: '09.账户关联认证-银行卡',
      component: require('../layout/layout9'),
    },
    
    layout10: {
      title: '10.银行卡绑定',
      component: require('../layout/layout10'),
    },
    
    layout11: {
      title: '11.账户关联认证-预留手机',
      component: require('../layout/layout11'),
    },
    
    layout12: {
      title: '12.付款详情',
      component: require('../layout/layout12'),
    },

  },
  
  // widget examples
  widgets: {
    // 
    form: {
      title: '表单',
      component: require('../layout/layout-form')
    },

    password: {
      title: '密码',
      component: require('../layout/layout-password')
    },

    vcode: {
      title: '验证码',
      component: require('../layout/layout-vcode')
    },

    modal: {
      title: '模态层',
      component: require('../layout/layout-modal')
    },

    banklist: {
      title: '银行列表',
      component: require('../layout/layout-banklist')
    },

    cardlist: {
      title: '银行卡列表',
      component: require('../layout/layout-cardlist')
    },

    icon: {
      title: '图标',
      component: require('../layout/layout-icon')
    },

    webview: {
      title: '页面',
      component: require('../layout/layout-webview')
    },

  }


};

module.exports = components;