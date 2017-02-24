'use strict';
import React, { Component } from 'react';
var Style = require('../style/style');
var Button = require('../button/button');
var Spacer = require('./spacer.js');

import Toast from 'react-native-root-toast';

import {
  StyleSheet,
  DeviceEventEmitter,
  LayoutAnimation,
  View, 
  Platform,
  Text,
  ScrollView,
  Image,
  Alert,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  AlertIOS,
  Dimensions,
} from 'react-native';

var win = Dimensions.get('window');
var styles, widget;

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const animations = {
    layout: {
        spring: {
            duration: 500,
            create: {
                duration: 300,
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity
            },
            update: {
                type: LayoutAnimation.Types.spring,
                springDamping: 200
            }
        },
        easeInEaseOut: {
            duration: 300,
            create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.scaleXY
            },
            update: {
                delay: 100,
                type: LayoutAnimation.Types.easeInEaseOut
            }
        }
    }
};

// 
widget = React.createClass({

  keys: [],
  
  // 
  getInitialState: function(){
    var disabled = this.props.disabled == 'true';

    return {
      text: this.props.text,
      disabled: disabled,
      height: 0
    };
  },

  getKeyButton: function(key){
    var text = {
      'c': 'C',
      'd': '<-'
    }[key] || key;

    return (
      <TouchableOpacity
        onPress={this.click(key)}
        activeOpacity={0.8}
        underlayColor="#CCC"
        key={key}
        style={[styles.key]}>
        <Text style={[styles.keyText]}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  },

  click: function(key){
    var onPress = this.props.onPress || function(){};
    var maxLength = this.props.maxLength;

    return function(){
      
      if(key === 'c'){
        this.keys = [];
      }else if(key === 'd'){
        this.keys.pop();
      }else if(this.keys.length < maxLength){
        this.keys.push(key);
      };

      onPress.call(this, {
        text: this.keys.join('')
      });

    }.bind(this);
  },

  componentDidMount: function(){
    // setTimeout(function(){
    //   this.setState({
    //     height: 200
    //   });
    // }.bind(this), 0);
  },

  componentWillUpdate: function(props, state) {
      if (state.height !== this.state.height)
          LayoutAnimation.configureNext(animations.layout.spring);
  },

  // 
  render: function(){


    return (
        <Toast 
          visible={true} 
          hideOnPress={false}
          style={[styles.container,this.props.style]}>
          <View style={styles.row}>
            {this.getKeyButton("1")}
            {this.getKeyButton("2")}
            {this.getKeyButton("3")}
          </View>
          <View style={styles.row}>
            {this.getKeyButton("4")}
            {this.getKeyButton("5")}
            {this.getKeyButton("6")}
          </View>
          <View style={styles.row}>
            {this.getKeyButton("7")}
            {this.getKeyButton("8")}
            {this.getKeyButton("9")}
          </View>
          <View style={styles.row}>
            {this.getKeyButton("c")}
            {this.getKeyButton("0")}
            {this.getKeyButton("d")}
          </View>
        </Toast>
    );
  }
});

widget.Spacer = Spacer;


// styles
styles = StyleSheet.create({
  wrap:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    backgroundColor: '#CCC',
    padding: 20,
    left: 0, 
    right: 0, 
    bottom: 0
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: win.width
  },
  key: {
    flex: 1,
    backgroundColor: 'red',
    margin: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#369',
    margin: 10,
    borderRadius: 5
  },
  keyText: {
    color: '#FFF'
  }
});

module.exports = widget;