'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,Alert, AlertIOS,
} from 'react-native';

var alert = Alert.alert;

var Widget = require('../widget/widget.js');

var {
  Style,
  Icon,
  SelectButton
} = Widget;

var layout = React.createClass({
  render: function(){

    var self = this, 
      views = [], 
      layout,
      icons = Icon.icons,
      icon;

    for(var n in icons) if(icons.hasOwnProperty(n)){
      icon = icons[n];
      views.push(
        <View style={[Style.mix('flexRow'), styles.row]} key={n}>
          <View style={styles.leftSide}>
            <Widget.Icon 
              icon={n}
              style={[styles.icon, {width: icon.width || 50}]}
              />
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.title}>
              {n}
            </Text>
            <Text style={styles.size}>
              {icon.width || 'auto'} x {icon.height || 'auto'}
            </Text>
          </View>
        </View>
      );
    };

    return (
      <View style={[Style.mix('page', 'flex')]}>
        <RN.ScrollView>
          {views}
        </RN.ScrollView>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({
  row:{
    backgroundColor: '#FFF',
    margin: 5,
    padding: 5,
    borderRadius: 5
  },
  //
  leftSide: {
    width: 60,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 5
  },
  //
  rightSide: {
    padding: 5,
    alignItems: 'stretch'
  },
  title: {
    marginBottom: 5
  },
  size: {
    color: '#CCC'
  },
});

module.exports = layout;