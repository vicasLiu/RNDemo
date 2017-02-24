'use strict';

/* 

// 引用方法1：

var Style = require('./path/to/widget/style/style');

// 引用方法2：

var Widget = require('./path/to/widget/widget');
var {
  Style
} = Widget;

// 使用方法1：

<View style={[Style.mix('page', 'flex'), styles.container]}>

// 使用方法1：

<View style={Style.page}>


 */

import React, { Component } from 'react';

import {
  StyleSheet,
  PixelRatio,
  Alert, 
  AlertIOS,
} from 'react-native';

var Style = {

  pixel: 1, // / PixelRatio.get(),

  realPixel: 1 / PixelRatio.get(),

  // 混合
  mix: function(arr){
    var args = Array.isArray(arr) ? arr : arguments;
    var styles = {};

    Array.prototype.forEach.call(args, function(n){
      var val = Style[n], obj = {};

      if(typeof val === 'undefined'){
        return;
      };

      if(typeof val === 'object'){
        obj = val;
      }else{
        obj[n] = val;
      };

      styles = Object.assign(styles, obj);
    });

    return styles;
  },

  // ---单个属性------------
  fontSize: 14,
  // Text
  textColor: '#666',
  // Text
  remarkColor: '#999',
  // Link的颜色
  linkColor: '#FF6600',
  linkDisabledColor: '#666',
  // 按钮的颜色
  buttonBackgroundColor: '#ed3126',
  buttonTextColor: '#FFF',
  buttonPressBackgroundColor: '#F60',
  // 不可用的按钮的颜色
  buttonDisabledBackgroundColor: '#999999',
  buttonDisabledTextColor: '#FFF',
  buttonDisabledPressBackgroundColor: '#999999',
  //
  borderColor: '#CCC'
};

Style = Object.assign(Style, {
  // ---类------------
  // 
  flex: {
    flex: 1
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  middle: {
    justifyContent: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  flexColumn: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  // 文本
  text: {
    color: Style.textColor
  },
  smallText: {
    fontSize: 12
  },
  bigText: {
    fontSize: 18
  },
  remark: {
    color: Style.remarkColor,
    fontSize: 12
  },
  strong: {
    fontWeight: 'bold'
  },
  textLeft: {
    textAlign: 'left'
  },
  textRight: {
    textAlign: 'right'
  },
  // 颜色
  red: {
    color: 'red'
  },
  black: {
    color: 'black'
  },
  white: {
    color: 'white'
  },
  orange: {
    color: '#FF6600'
  },
  blue: {
    color: '#336699'
  },
  green: {
    color: '339933'
  },
  // 行
  rowHeight: 50,
  row: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  textRow: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  padding: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  border: {
    borderTopWidth: Style.realPixel,
    borderTopColor: Style.borderColor,
    borderBottomWidth: Style.realPixel,
    borderBottomColor: Style.borderColor,
    borderLeftWidth: Style.realPixel,
    borderLeftColor: Style.borderColor,
    borderRightWidth: Style.realPixel,
    borderRightColor: Style.borderColor,
  },
  borderBottom: {
    borderBottomWidth: Style.realPixel,
    borderBottomColor: Style.borderColor,
  }
});

// 部件
Style = Object.assign(Style, {
  page: {
    backgroundColor:'#e5eaeb'
  },
  // 分割线
  separator: {
    height: 0,
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    marginTop: 10,
    marginBottom: 10
  }
});



module.exports = Style;