'use strict';
import React, { Component } from 'react';
var Style = require('../style/style');

import {
  StyleSheet,
  PixelRatio,
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
var pixel = Style.pixel;

var styles, widget;

// 
widget = React.createClass({
  
  // 
  getInitialState: function(){

    return {
      text: this.props.text,
      disabled: this.props.disabled == 'true'
    };
  },

  // 
  render: function(){
    var disabled = this.state.disabled;

    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={
          disabled ? null :
          this.props.onPress}
        activeOpacity={ disabled ? 1 : 0.8}
      >
        <Text style={[styles.text, 
            {
              color: this.state.disabled ? 
                Style.linkDisabledColor : 
                Style.linkColor
            },
            this.props.textStyle
          ]} 
          ref="text">
          {this.state.text}
        </Text>
      </TouchableOpacity>
    );
  }
});


// styles
styles = StyleSheet.create({
  container: {
    paddingLeft: 5,
    paddingRight: 5
  },
  text: {

  }
});

module.exports = widget;