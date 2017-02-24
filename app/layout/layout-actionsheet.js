'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,Alert, AlertIOS,
} from 'react-native';

var Widget = require('../widget/widget.js');
var Api = require('../api/api.js');

var {
  Style
} = Widget;

var layout = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  action: function(){
    //
    Api.ActionSheet([{
      text: 'button 1'
    },
    {
      text: 'button 2',
      data: [1,2,3,4],
      onPress: function(data){
        console.log(data.length);
      }
    }]);
  },

  share: function(){
    Api.ActionSheet.shareActions({
      url: 'http://baidu.com'
    });
  },

  render: function(){
    return (
      <View style={Style.mix('page')}>
        <Widget.Button onPress={this.action} text="action"/>
        <Widget.Button onPress={this.share} text="share"/>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;