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

  getInitialState: function() {
    return {
      userinfo: {
        name: '天虹xx店'
      }
    };
  },

  // 跳转到
  go: function(name){
    return function(){
      this.push(name);
    }.bind(this);
  },

  logout: function(){
    this.setState({
      userinfo: null
    });
  },

  render: function(){
    var self = this;
    var headerContent, logoutLink;

    if(this.state.userinfo){
      headerContent = (<Text style={[styles.username]}>{this.state.userinfo.name}</Text>);
      logoutLink = (
        <View style={[styles.item]} key={"logout"}>
          <SelectButton text={"退出登录"}
            onPress={this.logout} />
        </View>
      );
    }else{
      headerContent = (<Button style={[styles.loginButton]}>登录/注册</Button>);
    }



    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
          <View style={[styles.header]}>
            {headerContent}
          </View>
      </View>
    );

    // return (
    //   <View style={[Style.mix('page', 'flex'), styles.container]}>
    //       <View style={[styles.header]}>
    //         {headerContent}
    //       </View>
    //       <View style={[Style.mix('flex'), styles.list]}>
    //           <View style={[styles.item]} key={"orders"}>
    //             <SelectButton text={"订单列表"}
    //               onPress={self.go("orders")} />
    //           </View>
    //           {logoutLink}
    //       </View>
    //   </View>
    // );
  }
});

var nav = React.createClass({


  render: function(){
    var self = this;

    return (
      <Widget.Navigator
        style={[Style.mix('flex'), styles.navigator]}
        components={Layouts}
        initialRoute={{
          title: '商户',
          component: Layout
        }} />
    );
  }
  
});

// styles
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 40
  },
  navigator: {
    flexDirection: 'column',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 60,
    backgroundColor: '#E84F1E',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  username: {
    color: '#FFF',
  },
  loginButton: {
    borderWidth: Style.realPixel,
    backgroundColor: 'transparent',
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