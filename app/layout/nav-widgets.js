'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  NavigatorIOS,
  ScrollView,
  Alert, 
  AlertIOS,
} from 'react-native';


// 引用所有页面的引用
// 将其赋予 Widget.Navigator 控件的 props.componets 属性
var Layouts = require('./components.js').widgets || {};

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

var createCardNumber = function(){
  var no = '', len = 19;
  for(var i = 0; i < len; i++){
    no += parseInt(Math.random()*10, 10);
  };
  return no;
};

var layout = React.createClass({

  mixins: [NavMinin],

  render: function(){
    var self = this, views = [], layout;

    for(var n in Layouts) if(Layouts.hasOwnProperty(n)){
      layout = Layouts[n];
      views.push(
        <View style={[]} key={n}>
          <SelectButton text={layout.title}
            onPress={function(){
              self.push(this);
            }.bind(layout)} />
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
    return (
      <Widget.Navigator
        style={styles.flex}
        components={Layouts}
        initialRoute={{
          title: '控件',
          component: layout
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
  container: {

  }
});

module.exports = nav;