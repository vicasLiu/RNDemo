'use strict';
import React, { Component } from 'react';
var Button = require('../button/button');
var Style = require('../style/style');

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Alert, 
  AlertIOS,
} from 'react-native';

var alert = Alert.alert;

var styles, widget;

// 
widget = React.createClass({

  getDefaultProps() {
      return {
        label: '验证码',
        placeholder: '请输入验证码',
        buttonText: '发送',
        maxLength: 4,
        count: 3,
        onSend: function(){}
      };
  },
  
  // 
  getInitialState: function(){
    return {
      count: 0
    };
  },

  componentWillUnmount: function(){
    clearInterval(this._timer);
  },

  send: function(){

    var state = this.state;
    var props = this.props;
    var btn = this.refs.btnSendCode;

    //
    if(state.count > 0){
      return;
    };

    if(typeof this.props.onSend){
      this.props.onSend();
    };

    //
    state.count = props.count;
    //
    btn.setState({
      text: state.count + 's',
      disabled: true
    });

    //
    this._timer = setInterval(function(){
      if(state.count > 0){
        state.count -= 1;
        btn.setState({
          text: state.count + 's',
          disabled: true
        });
      }else{
        btn.setState({
          text: props.buttonText,
          disabled: false
        });
        clearInterval(this._timer);
      };
    }.bind(this), 1000);
  },

  // 
  render: function(){
    
    return (
      <View
        style={[styles.flex, this.props.style]}>
        <View style={[
          styles.row
        ]}>
          <Text style={styles.label}>{this.props.label}</Text>
          <TextInput style={[styles.input]} 
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength}
            keyboardType='numbers-and-punctuation'
            onChange={this.props.onChange}
            onChangeText={this.props.onChangeText}
            />
          <Button text={this.props.buttonText} ref="btnSendCode" 
            onPress={this.send}
            style={{height: 35}}/>
        </View>
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
    height: 50,
    borderTopWidth: Style.pixel,
    borderTopColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstRow: {
    borderTopWidth: 0
  },
  label: {
    width: 100,
    textAlign: 'left',
    paddingLeft: 10,
    color: '#484848',
    fontSize: 14
  },
  input: {
    flex:3,
    fontSize: 14,
    textAlign: 'left'
  },
  text: {
    color: '#484848',
  },
  textInput: {
    color: '#ababab'
  }
});

module.exports = widget;
