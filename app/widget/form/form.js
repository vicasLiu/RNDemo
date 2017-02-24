'use strict';
import React, { Component } from 'react';
var Style = require('../style/style');

import RN, {
  StyleSheet,
  PixelRatio,
  View,
  Text,
  ScrollView,
  Image,
  Alert, 
  AlertIOS,
} from 'react-native';

var alert = Alert.alert;
var pixel = Style.pixel;

var styles, widget;

// 验证函数
var validtor = function(rule, value){

  if(rule == 'required'){
    if(value === ''){
      return '不能为空';
    }
  }

  return null;
};

// 遍历对象
var each = function(obj, callback){
  var result;
  for(var n in obj) if(obj.hasOwnProperty(n)){
    result = callback(obj[n], n);
    if(result === false){
      continue;
    };
  };
};

// 
widget = React.createClass({

  // 存储表单所有字段的验证状态
  _validState: {
    // name: null,
    // idnumber: '身份证格式错误'
  },

  // 取得表单验证结果
  getError: function(){
    var err = '';
    //
    each(this._validState, function(msg){
      if(msg){
        err = msg;
        return false;
      };
    });
    return err;
  },
  
  // 
  getInitialState: function(){
    var children = this.props.children, temp;

    /* 把
      { 
        'a': { ... },
        'b': { ... }
      }
    转换成
      [
        { name: 'a', ... },
        { name: 'b', ... }
      ]
     */
    if(typeof children === 'object' && !Array.isArray(children)){
      temp = children;
      children = [];
      each(temp, function(child, name){
        child.name = name;
        children.push(child);
      });
    };

    return {
      children: children,
      invalid: false
    };
  },

  getChildren: function(){
    var children = [], self = this;

    this.state.children.forEach(function(cfg, index){
      var child,
        //
        props = cfg.props || {},
        //
        Type = {
          TextInput: {
            target: RN.TextInput,
            cls: styles.textInput
          },
          Text: {
            target: RN.Text,
            multiline: true,
            cls: styles.text
          }
        }[cfg.type],
        //
        onChangeText = function(text){
          if(typeof props.onChangeText === 'function'){
            props.onChangeText.apply(this, arguments);
          };
          var err = validtor(props.valid, text);
          if(err){
            self._validState[cfg.name] = cfg.label + err;
          };
        };

      if(!Type){
        return;
      };

      var isDetail = self.props.type == 'detail';

      //
      child = (
        <View key={index} style={[
          Style.mix('row'),
          isDetail ? '' : Style.borderBottom,
          styles.row,
          index === 0 ? styles.firstRow : null,
          self.props.rowStyle
        ]}>
          <Text style={[
            styles.label,
            isDetail ? Style.smallText : null,
            self.props.labelStyle
          ]}>{[cfg.label]}</Text>
          <Type.target style={[
              styles.input, 
              Type.cls, 
              isDetail ? Style.smallText : null,
              self.props.fieldStyle,
              props.style
            ]} 
            placeholder={props.placeholder}
            maxLength={props.maxLength}
            onChange={props.onChange}
            onChangeText={onChangeText}
            onBlur={props.onBlur}
            onEndEditing={props.onEndEditing}
            onFocus={props.onFocus}
            defaultValue={props.value}
            keyboardType={props.keyboardType}
            placeholderTextColor={props.placeholderTextColor}
            multiline={props.multiline}
            >
            { Type.multiline ? (props.value || cfg.text) : null }
            </Type.target>
        </View>
      );

      children.push(child);
    });

    return children;
  },

  // 
  render: function(){
    var children = this.getChildren();

    return (
      <View
        style={[styles.flex, this.props.style]}>
        {children}
      </View>
    );
  }
});

// styles
styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  row:{
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstRow: {
    borderTopWidth: 0
  },
  label: {
    width: 100,
    textAlign: 'left',
    color: '#484848',
    fontSize: Style.fontSize
  },
  input: {
    flex:3,
    fontSize: Style.fontSize,
    textAlign: 'left'
  },
  text: {
    color: '#484848',
  },
  textInput: {
    color: '#ababab',
    height: Style.fontSize + 2
  }
});

module.exports = widget;