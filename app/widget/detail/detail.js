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

var styles, widget;

// 
widget = React.createClass({
  
  // 
  getInitialState: function(){
    return {};
  },

  // 
  render: function(){
    return (
      <View
        style={styles.flex}>
      </View>
    );
  }
});

// styles
styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

module.exports = widget;