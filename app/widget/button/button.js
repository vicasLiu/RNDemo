'use strict';
import React, { Component } from 'react';
var Style = require('../style/style');

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';

var alert = Alert.alert;

var styles, widget;

// 
widget = React.createClass({
  
  // 
  getInitialState: function(){
    var disabled = this.props.disabled == 'true';

    return {
      text: this.props.text,
      disabled: disabled
    };
  },

  // 
  render: function(){
    var disabled = this.state.disabled;

    return (
      <TouchableOpacity
        onPress={
          disabled ? null :
          this.props.onPress
        }
        activeOpacity={ disabled ? 0.99 : 0.8}
        underlayColor={
          disabled ? 
            Style.buttonDisabledPressBackgroundColor : 
            Style.buttonPressBackgroundColor
        }
        style={[styles.container, {
          backgroundColor: disabled ? 
            Style.buttonDisabledBackgroundColor : 
            Style.buttonBackgroundColor
        }, this.props.style]}>
        <Text style={[styles.text, {
          color: this.state.disabled ? 
            Style.buttonDisabledTextColor : 
            Style.buttonTextColor
        }, this.props.textStyle]} ref="text">
          {this.state.text || this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
});


// styles
styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  text: {

  }
});

module.exports = widget;