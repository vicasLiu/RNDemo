'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  NavigatorIOS,
  ScrollView,Alert, AlertIOS,
} from 'react-native';

// 引用所有页面的引用
var Layouts = require('../core/components.js').pages || {};

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
var NavMinin = require('../core/nav-mixin.js');

var Widget = require('../widget/widget.js');

var {
  Style,
  SelectButton,
  Button,
  alert,
  BankList
} = Widget;

var Layout = React.createClass({

  mixins: [NavMinin],

  // 跳转到
  go: function(name){
    return function(){
      this.push(name);
    }.bind(this);
  },

  render: function(){
    var self = this;
    var views = [], layout;

    for(var n in Layouts) if(Layouts.hasOwnProperty(n)){
      layout = Layouts[n];
      views.push(
        <View style={[]} key={n}>
          <SelectButton text={layout.title}
            onPress={self.go(n)} />
        </View>
      );
    };

    return (
        <View style={[Style.mix('page', 'flex'), styles.container]}>
          <ScrollView>
            <View>
              {views}
            </View>
          </ScrollView>
        </View>
    );
  }
});

var nav = React.createClass({


  render: function(){

    var bar = (<View style={[styles.bar]}></View>);

    return (
      <Widget.Navigator
        style={[styles.flex, styles.navigator]}
        components={Layouts}
        initialRoute={{
          title: 'layout',
          component: Layout
        }} />
      
    );
  }
  
});

// styles
var styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: 'red'
  },
  navigator: {
    flexDirection: 'column',
    marginBottom: 50
  },
  bar: {
    height:40,
    top: 0,
    backgroundColor:'red'
  }
});

module.exports = nav;