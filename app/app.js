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

// var Widget = require('./widget/widget');
// var Style = require('./widget/style/style');

var NavLayouts = require('./layout/nav-layouts');
var NavWidgets = require('./layout/nav-widgets');

import Merchant from '../bsc/app.js'
import CreateOrder from './page/create-order.js'

var tabs = [
  // {
  //   name: 'password',
  //   title: '密码',
  //   icon: require('./images/template@2x.png'),
  //   getTarget: function(){
  //     var Page = require('./layout/layout-password.js');
  //     return (<Page></Page>); 
  //   }
  // },
  // {
  //   name: 'pages',
  //   title: '页面',
  //   icon: require('./images/template@2x.png'),
  //   getTarget: function(){
  //     var Page = require('./page/page-list.js');
  //     return (<Page></Page>); 
  //   }
  // },
  {
    name: 'layouts',
    title: '收单',
    icon: require('./images/template@2x.png'),
    getTarget: function(){
      return (<CreateOrder></CreateOrder>); 
    }
  },
  {
    name: 'widgets',
    title: '商户',
    icon: require('./images/widget@2x.png'),
    getTarget: function(){
      return (<Merchant></Merchant>); 
    }
  }
];

var Page = React.createClass({
  //
  getInitialState() {

    return {
      selectedTab: tabs[0].name,
      tabs: tabs
    };
  },

  //
  select: function(name){
    this.setState({
      selectedTab: name
    });
  },

  //
  getTabBarItems: function(){
    var items = [];
    var self = this, tabs = this.state.tabs, tab;

    tabs.forEach(function(tab){

      tab = Object.assign({
        title: tab.name,
        getTarget: function(){ return (<View></View>); }
      }, tab);

      items.push(
        <TabBarIOS.Item
          key={tab.name}
          icon={tab.icon}
          systemIcon={tab.systemIcon}
          title={tab.title}
          onPress={self.select.bind(self, tab.name)}
          selected={self.state.selectedTab === tab.name}>
            {tab.getTarget()}
        </TabBarIOS.Item>
      );
    });

    return items;
  },

  //
  render: function(){

    return (
      <View style={[styles.flex]}>

        <TabBarIOS style={styles.container}>
          {this.getTabBarItems()}
        </TabBarIOS>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  flex: {
    flex:1
  },
  container: {
    flex:1,
    marginTop:20
  },
  list_item:{
    padding: 10,
    backgroundColor: '#EEE',
    //marginBottom: Style.pixel
  },
  contentContainer:{

  },
  keyboard: {
    height: 100,
    backgroundColor: 'red'
  }
});

module.exports = Page;