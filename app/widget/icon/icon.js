'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Alert, 
  AlertIOS,
} from 'react-native';

var styles, Icon;

// 
Icon = React.createClass({
  
  // 
  getInitialState: function(){
    return {};
  },

  getIcon: function(name){
    return Icon.icons[name];
  },

  // 
  render: function(){

    var icon = this.getIcon(this.props.icon) || { width: 0, height: 0};

    return (
      <Image
        style={[styles.image, {
          width: icon.width,
          height: icon.height
        }, this.props.style]}
        source={icon.source} />
    );
  }
});

Icon.icons = {
  'rightArrow': {
    source: require('./images/right-arrow.png'),
    width: 20,
    height: 20
  },
  'fence': {
    source: require('./images/fence.png'),
    height: 40
  },
  'success-40-40': {
    source: require('./images/success-40-40@2x.png'),
    width: 40,
    height: 40
  },
  'success-30-30': {
    source: require('./images/success-30-30@2x.png'),
    width: 30,
    height: 30
  },
  'success-20-20': {
    source: require('./images/success-20-20@2x.png'),
    width: 20,
    height: 20
  },
  'success': {
    source: require('./images/success-20-20@2x.png'),
    width: 20,
    height: 20
  },
  //
  'failure-40-40': {
    source: require('./images/failure-40-40@2x.png'),
    width: 40,
    height: 40
  },
  'failure-30-30': {
    source: require('./images/failure-30-30@2x.png'),
    width: 30,
    height: 30
  },
  'failure-20-20': {
    source: require('./images/failure-20-20@2x.png'),
    width: 20,
    height: 20
  },
  'failure': {
    source: require('./images/failure-20-20@2x.png'),
    width: 20,
    height: 20
  },
  //
  'close-40-40': {
    source: require('./images/close-40-40@2x.png'),
    width: 40,
    height: 40
  },
  'close-30-30': {
    source: require('./images/close-30-30@2x.png'),
    width: 30,
    height: 30
  },
  'close-20-20': {
    source: require('./images/close-20-20@2x.png'),
    width: 20,
    height: 20
  },
  'close': {
    source: require('./images/close-20-20@2x.png'),
    width: 20,
    height: 20
  },
};

// styles
styles = StyleSheet.create({
  image: {

  }
});

module.exports = Icon;