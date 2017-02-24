// 'use strict';

// import React, { Component } from 'react';
// import {
//   AppRegistry,
// } from 'react-native'; 

// AppRegistry.registerComponent('ppbc', () => require('./app/app.js'));

import { Navigation } from 'react-native-navigation';
import Style from './ui/style.js';

Navigation.registerComponent('index', () => require('./demo/index.js'));
Navigation.registerComponent('login', () => require('./demo/login.js'));
Navigation.registerComponent('input', () => require('./demo/input.js'));
Navigation.registerComponent('scan', () => require('./demo/scan.js'));
Navigation.registerComponent('confirm', () => require('./demo/confirm.js'));
Navigation.registerComponent('status', () => require('./demo/status.js'));
Navigation.registerComponent('orders', () => require('./demo/orders.js'));
Navigation.registerComponent('setting', () => require('./demo/setting.js'));

Navigation.startSingleScreenApp({
  screen: {
    title: '商户客户端',
    screen: 'index',
  },
});