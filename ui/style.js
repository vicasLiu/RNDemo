import React, { Component } from 'react';
import { StyleSheet, PixelRatio } from 'react-native';

var Style = {

  pixel: 1, 

  realpixel: 1 / PixelRatio.get(),

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
  fontSize: 16,
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
  // 不可用的按钮的颜色
  buttonDisabledBackgroundColor: '#999999',
  buttonDisabledTextColor: '#FFF',
  //
  borderColor: '#CCC'
};

Style = Object.assign(Style, {
  // ---类------------
  pt20: {
      paddingTop: 20
  },
  mt20: {
      marginTop: 20
  },
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
  title: {
    fontSize: 24,
    color: '#000',
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

Style = Object.assign(Style, {
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
  buttonBackgroundColor: '#FFF',
  buttonTextColor: '#73a5d8',
  // 不可用的按钮的颜色
  buttonDisabledBackgroundColor: '#DDD',
  buttonDisabledTextColor: '#999',
  //
  borderColor: '#CCC'
})

// 部件
Style = Object.assign(Style, {
  bgColor: '#387ee8',
  textColor: '#FFF',
  page: {
    backgroundColor:'#387ee8',
    flex: 1
  },
  pageGray: {
    backgroundColor:'#EEEEEE',
    flex: 1
  },
  pageGrayForm: {
    backgroundColor: '#FFF'
  },
  pageGrayLabelText: {
    color: '#999'
  },
  pageGrayInputProps: {
      selectionColor: "#033563",
      placeholderTextColor: "#CCC"
  },
  pageGrayInputStyle: {
    color: '#033563'
  },
  pageGrayTextStyle: {
    color: '#033563'
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

Style = Object.assign(Style, {
  navigatorStyle: {
      navBarBackgroundColor: Style.bgColor,
      navBarTextColor: Style.textColor,
      navBarButtonColor: Style.textColor,
      navBarNoBorder: true,
  }
});



export default Style;