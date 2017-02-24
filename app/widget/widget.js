'use strict';

import React, { Component } from 'react';

var widget = {
  // 页面控件
  Component:    require('./component/component'),
  // 导航控件
  Navigator:    require('./navigator/navigator'),
  //
  WebView:      require('./webview/webview'),
  // 统一style
  Style:        require('./style/style'),
  //
  Form:         require('./form/form'),
  VCode:        require('./vcode/vcode'),
  Button:       require('./button/button'),
  SelectButton: require('./select-button/select-button'),
  Password:     require('./password/password'),
  Link:         require('./link/link'),
  //分割线
  Separator:    require('./separator/separator'),
  // //
  Agree:        require('./agree/agree'),
  BankList:     require('./bank-list/bank-list'),
  CardList:     require('./card-list/card-list'),
  Checkbox:     require('./checkbox/checkbox'),
  Detail:       require('./detail/detail'),
  Icon:         require('./icon/icon'),
  Modal:        require('./modal/modal'),
  Steps:        require('./steps/steps'),
  Loading:      require('./loading/loading'),
  // //
  Keyboard:     require('./keyboard/keyboard')
};

module.exports = widget;
