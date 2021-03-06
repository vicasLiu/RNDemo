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
var Layouts = require('./components.js').layouts || {};

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
  // render: function(){

  //   var bar = (<View style={[styles.bar]}></View>);

  //   return (
  //     <Widget.Navigator
  //       style={[styles.flex, styles.navigator]}
  //       components={Layouts}
  //       renderScene={function(route, navigator){
  //         var Scene;

  //         console.info('-->'+route.name)

  //         if(route.name == 'layout'){
  //           Scene = Layout;
  //         }else if(Layouts[route.name]){
  //           Scene = Layouts[route.name].component;
  //         }else{
  //           return;
  //         };

  //         return (<Scene
  //           name={route.name}
  //           navigator={navigator}
  //           onForward={(a,b) => {
  //             var nextIndex = route.index + 1;
  //             navigator.push({
  //               name: 'Scene ' + nextIndex,
  //               index: nextIndex,
  //             });
  //           }}
  //           onBack={() => {
  //             if (route.index > 0) {
  //               navigator.pop();
  //             }
  //           }}
  //         />)
  //       }}
  //       navigationBar={bar}
  //       initialRoute={{
  //         name: 'layout',
  //         index: 0
  //       }} />
      
  //   );
  // }
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