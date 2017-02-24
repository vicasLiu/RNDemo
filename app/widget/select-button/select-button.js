'use strict';
import React, { Component } from 'react';
var Icon = require('../icon/icon.js');
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
  AlertIOS,
} from 'react-native';

var styles, widget;

// 
widget = React.createClass({

  getDefaultProps() {
      return {

      };
  },
  
  // 
  getInitialState: function(){
    return {

    };
  },

  onPress: function(){
    var fn = this.props.onPress;
    var value = this.props.value;
    //
    if(typeof fn === 'function'){
      fn(this, value);
    };
  },

  // 
  render: function(){
    var self = this;

    return (
      <TouchableHighlight
        onPress={this.onPress}
        style={[styles.button, this.props.style]}
        underlayColor='#e6e6e6'
      >
        <View style={styles.row}>
          <Text style={[styles.text]} ref="text">
            {this.props.text}
          </Text>
          <Icon icon="rightArrow" />
        </View>
      </TouchableHighlight>
    );
  }
});


// styles
styles = StyleSheet.create({
  button:{
    flex: 1,
    backgroundColor: '#FFF',
    //
    borderBottomWidth: Style.pixel,
    borderBottomColor: '#eeeeee'
  },
  row:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    flex:1,
    color: '#484848',
    textAlign: 'left'
  }
});

module.exports = widget;