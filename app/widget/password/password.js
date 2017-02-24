'use strict';
import React, { Component } from 'react';
var Icon = require('../icon/icon');
var Style = require('../style/style');
var Keyboard = require('./keyboard');

import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert, 
  AlertIOS,
} from 'react-native';

var styles, widget;

// 
widget = React.createClass({

  getDefaultProps() {
    return {
      keyboard: false
    };
  },
  
  // 
  getInitialState: function(){
    return {
      password: '',
      keyboard: this.props.keyboard
    };
  },

  getValue: function(){
    return this.state.password;
  },

  // 显示隐藏密码框
  onPressInput: function(){
    this.setState({
      keyboard: !this.state.keyboard
    });
  },

  // componentDidMount: function(){
  //   setTimeout(function(){
  //     this.refs.input.focus();
  //   }.bind(this), 300);
  // },

  onKeyPress: function(e){
    var onChange = this.props.onChange;

    this.setState({
      password: e.text
    });

    //
    if(typeof onChange === 'function'){
      onChange(e.text);
    };
  },

  // 
  render: function(){
    var self = this;
    var len = this.state.password.length;

    return (
      <TouchableOpacity
        style={[styles.touch]}
        onPress={this.onPressInput}
        activeOpacity={9}
      >
        <View style={[styles.container, this.props.style]}>
          <View style={[styles.grid, styles.firstGrid]} >
            <View style={[ len >= 1 ? styles.circle : null ]} />
          </View>
          <View style={[styles.grid]} >
            <View style={[ len >= 2 ? styles.circle : null ]} />
          </View>
          <View style={[styles.grid]} >
            <View style={[ len >= 3 ? styles.circle : null ]} />
          </View>
          <View style={[styles.grid]} >
            <View style={[ len >= 4 ? styles.circle : null ]} />
          </View>
          <View style={[styles.grid]} >
            <View style={[ len >= 5 ? styles.circle : null ]} />
          </View>
          <View style={[styles.grid]} >
            <View style={[ len >= 6 ? styles.circle : null ]} />
          </View>
        </View>
        <Keyboard 
          onPress={this.onKeyPress} 
          maxLength={6}
          visible={this.state.keyboard}
          fixed={this.props.keyboardFixed}
          />
      </TouchableOpacity>
    );
  }
});

var borderColor = '#666', 
  circleColor = '#777',
  gridWidth = 50,
  circleWidth = 30,
  pixel = Style.pixel;

// styles
styles = StyleSheet.create({
  touch: {

  },
  container:{
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
    width: gridWidth,
    height: gridWidth,
    borderTopColor: borderColor,
    borderRightColor: borderColor,
    borderBottomColor: borderColor,
    borderTopWidth: pixel,
    borderRightWidth: pixel,
    borderBottomWidth: pixel
  },
  firstGrid: {
    borderLeftWidth: pixel,
    borderLeftColor: borderColor
  },
  circle: {
    width: circleWidth,
    height: circleWidth,
    backgroundColor: circleColor,
    borderRadius: circleWidth/2
  },
  input: {
    height: 0,
    width: 0
  }
});

module.exports = widget;
