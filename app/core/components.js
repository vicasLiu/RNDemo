export var pages = {

  'create-order': {
    title: '收单',
    component: require('../page/create-order')
  },

  'order-form': {
    title: '录入订单',
    component: require('../page/order-form')
  },

  'order-scan': {
    title: '扫描二维码',
    component: require('../page/order-scan')
  },

  'order-confirm': {
    title: '订单确认',
    component: require('../page/order-confirm')
  },

  //首次绑卡页面
  "UserInfoPage": {
    component: require("../page/bindCard/userInfo"),
    title: "开通信通宝"
  },
  "SetPasswordPage": {
    component: require("../page/bindCard/setPassword"),
    title: "设置交易密码"
  },
  "BindCardPage": {
    component: require("../page/bindCard/bindCard"),
    title: "绑定银行卡"
  },
  "SelectBanklistPage": {
    component: require("../page/bindCard/selectBanklist"),
    title: "选择银行卡"
  },
  "VCodePage": {
    component: require("../page/bindCard/vcodePage"),
    title: "验证短信"
  },
  //支付
  "PayPage": {
    component: require("../page/cashDesk/payPage"),
    title: "收银台"
  },
  "PayDetailPage": {
    component: require("../page/cashDesk/payDetail"),
    title: "交易结果"
  },
  "ChooseBankPage": {
    component: require("../page/cashDesk/chooseBank"),
    title: "更换银行卡"
  },
  "SecurityPage": {
    component: require("../page/cashDesk/securitycheck"),
    title: "自行认证"
  },
  // "CompletePage": {
  //   component: require('../page/public/complete'),
  //   title: '交易结果'
  // },
  //关联认证
  "AuthentcationPage": {
    component: require("../page/relative/authentication"),
    title: "关联认证"
  },
  "RelativeTieCardPage": {
    component: require("../page/relative/relativeTieCard"),
    title: "绑卡验证"
  },
  "ValidatePwdPage": {
    component: require("../page/relative/validatePwd"),
    title: "校验交易密码"
  },
  //绑卡
  "TieCardPage": {
    component: require("../page/tiecard/tieCard"),
    title: "绑定银行卡"
  },
  "VerificationPage": {
    component: require("../page/tiecard/verification"),
    title: "短信验证"
  },
  "ValidatePwdNPage": {
    component: require("../page/tiecard/validatePwd"),
    title: "校验交易密码"
  },
  //忘记密码
  "BankListPage": {
    component: require("../page/forgetpwd/banklist"),
    title: "选择银行卡"
  },
  "ResetPwdPage": {
    component: require("../page/forgetpwd/resetpwd"),
    title: "重设交易密码"
  },
  "VarifyCardPage": {
    component: require("../page/forgetpwd/varifycard"),
    title: "验证账户信息"
  },
  "VarifyCodePage": {
    component: require("../page/forgetpwd/varifycode"),
    title: "验证短信"
  },
  //赎回
  'RedeemPage': {
    component: require('../page/refund/redeem'),
    title: '赎回-验证交易密码'
  },
  'RedeemResultPage': {
    component: require('../page/refund/result'),
    title: '赎回结果'
  },
  // //协议公共页面
  // "AgreementPage": {
  //   component: require('../page/public/agreement'),
  //   title: '协议展示'
  // }
};

export default {
  pages: pages
};