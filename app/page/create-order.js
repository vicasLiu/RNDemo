'use strict';

import React, { Component } from 'react';

import RN, {
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
import { pages } from '../core/components.js';

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
import NavMinin from '../core/nav-mixin.js';

import Widget, {
  Style,
  SelectButton,
  Button,
  alert,
  BankList
} from '../widget/widget.js'

var Layout = React.createClass({

  mixins: [NavMinin],

  // 跳转到
  go: function(name){
    return function(){
      this.push(name);
    }.bind(this);
  },

  next: function(){


    this.push({
      title: '录入订单',
      component: require('./order-form.js')
    });

    // this.push({
    //   title: '订单状态',
    //   component: require('./order-status.js'),
    //   passProps: {
    //     "amount": 30,
    //     "outTradeNo": 'BSC1480042403903' // data.outTradeNo,
    //   }
    // });
  },
  
  render: function(){
    var self = this;
    
    return (
        <View style={[Style.mix('page', 'flex'), styles.container]}>
            <Button style={[styles.loginButton]}
              onPress={this.next}>创建订单</Button>
        </View>
    );
  }
});

var nav = React.createClass({

  render: function(){

    var bar = (<View style={[styles.bar]}></View>);
    var self = this;

    return (
      <Widget.Navigator
        style={[Style.mix('flex'), styles.navigator]}
        components={pages}
        initialRoute={{
          title: '收单',
          component: Layout
        }} />
    );

  }
  
});

// styles
var styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  navigator: {
    flexDirection: 'column',
    marginBottom: 50
  },
  bar: {
    height:40,
    top: 0,
    backgroundColor:'red'
  },
  header: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: '#E84F1E',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  username: {
    color: '#FFF',
  },
  loginButton: {
    borderWidth: Style.realPixel,
    backgroundColor: '#E84F1E',
    borderColor: '#FFF',
    borderRadius: 5,
    width: 120,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  list: {
    marginBottom: 50
  },
  item: {
    backgroundColor: 'blue',
    height: 60,
  }
});

module.exports = nav;