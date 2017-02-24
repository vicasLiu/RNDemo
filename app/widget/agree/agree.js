'use strict';
import React, { Component } from 'react';
var Style = require('../style/style');
var Link = require('../link/link');
var Checkbox = require('../checkbox/checkbox');

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Alert, 
  AlertIOS,
} from 'react-native';

var styles, widget;

// 
widget = React.createClass({

  getDefaultProps: function(){
    return {
      agreeText: '同意',
      linkText: '《用户协议》',
      agree: false
    };
  },
  
  // 
  getInitialState: function(){
    return {};
  },

  onChange: function(checked){
    var fn = this.props.onChange;
    if(typeof fn !== 'function') return;

    fn(checked);
  },

  onRead: function(){
    var fn = this.props.onRead;
    if(typeof fn !== 'function') return;

    fn();
  },

  // 
  render: function(){
    return (
      <View style={[Style.mix('row', 'flexRow'), styles.container, this.props.style]}>
        
        <Checkbox
          style={[
            styles.checkbox,
            this.props.checkboxStyle
          ]}
          checked={this.props.agree}
          onChange={this.onChange}
        />
        <Text style={[
          Style.mix('text', 'remark', 'smallText'), 
          styles.text,
          this.props.agreeStyle
          ]}>{this.props.agreeText}</Text>
        <Link text={this.props.linkText} 
          textStyle={[
            Style.mix('smallText'), 
            styles.text, 
            this.props.linkStyle
          ]}
          onPress={this.onRead} 
        />
      </View>
    );
  }
});

// styles
styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 0,
  },
  text: {
    height: 17,
    paddingTop: 5
  },
  checkbox: {
    paddingRight: 5
  }
});

module.exports = widget;