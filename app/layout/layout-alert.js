'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,Alert, AlertIOS,
} from 'react-native';

var Widget = require('../widget/widget.js');
var Alert = require('../api/api.js').Alert;

var {
  Style
} = Widget;

var layout = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  click: function(){
Alert.alert(
  '标题', 
  '消息正文', 
  [
    {
      '按钮1文字': function(){
        console.log('按钮1被点击');
      }
    },{
      '按钮2文字': function(){
        console.log('按钮2被点击');
      }
    }
  ]
);
  },

  render: function(){
    return (
      <View style={Style.mix('page')}>
        <Widget.Button onPress={this.click} text="click"/>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;