'use strict';
import React, { Component } from 'react';

var Style = require('../style/style');

import {
  StyleSheet,
  View,Alert, AlertIOS,
} from 'react-native';

var styles, widget;

// 
widget = React.createClass({

  // 
  render: function(){
    return (
      <View
        style={[Style.mix('separator'), this.props.style]}
      >
      </View>
    );
  }
});

// styles
styles = StyleSheet.create({

});

module.exports = widget;