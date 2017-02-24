'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS,
  TabBarIOS,
  PixelRatio,
  View,
  ScrollView,Alert, AlertIOS,
} from 'react-native';

import Main from './page/main.js'

var Page = React.createClass({
  //
  render: function(){
    return (
      <Main></Main>
    );
  }
});

var styles = StyleSheet.create({
  flex: {
    flex:1
  },
});

module.exports = Page;