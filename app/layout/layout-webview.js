'use strict';

import React, { Component } from 'react';
//var Dimensions = require('dimensions');

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,Alert, AlertIOS,
} from 'react-native';

var alert = Alert.alert;

var Widget = require('../widget/widget.js');

var {
  Style,
  Button,
  Password,
  Link
} = Widget;

var layout = React.createClass({

  getInitialState: function(){
    var html = `
      <h1>这是一个本地html页面</h1>
      <style> button{ border-radius:0; } </style>
      <button type="button" id="btn">点击</button>
    `;

    //document.querySelector('h1').style.backgroundColor = 'red';
    var js = `
      setTimeout(function(){
        document.querySelector('div').style.backgroundColor = 'red';
      }, 100);
    `;

    return {
      source: {
        html: html,
        //uri: '../debug/login.html',
        //uri: 'http://192.168.31.114:3033/login.html?tel=15919978052',
        js: js
      }
    };
  },

  render: function(){

    return (
      <View style={Style.mix('page', 'flex')}>
        <Widget.WebView 
          source={this.state.source}
          injectedJavaScript={this.state.js}
          javaScriptEnabled={true}
          onLoad={function(a,b){
            console.info(a);
            console.info(b);
          }}
          />
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;