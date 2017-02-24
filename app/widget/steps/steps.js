'use strict';
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Image,Alert, AlertIOS,
} from 'react-native';

var styles;

module.exports = React.createClass({

  //
  getInitialState: function(){
    return {
      //
      steps: [
        {
          text: '填写基本信息'
        },
        {
          text: '设置交易密码'
        },
        {
          text: '绑卡验证'
        }
      ],
      //
      activeIndex: parseFloat(this.props.activeIndex)
    };
  },

  // 取得一个Step
  getStep: function(step, index){

    var len = this.state.steps.length,
      isFirst = index === 0,
      isLast = index === len -1,
      isActive = index === this.state.activeIndex;

    var items = [];

    return (
      <View style={styles.step} key={index}>
        <View style={[
          styles.progress,
          isActive ? styles.progressActive : null
          ]}>
          <View style={[
            styles.line,
            isActive ? styles.lineActive : null
            ]}></View>
          <Text style={[
            styles.index,
            isActive ? styles.indexActive : null,
            isFirst ? styles.indexFirst : null,
            isLast ? styles.indexLast : null
            ]}>{index+1}</Text>
        </View>
        <Text style={[
          styles.desc,
          styles.descActive,
          isFirst ? styles.alignLeft : null,
          isLast ? styles.alignRight : null
          ]}>{step.text}</Text>
      </View>
    );
  },

  // 取得全部Step
  getSteps: function(){
    var items = [], sub = this.getStep;

    this.state.steps.forEach(function(step, index){
      items.push(sub(step, index));
    });

    return items;
  },

  //
  render: function(){
    return (
      <View style={styles.container}>
        {this.getSteps()}
      </View>
    );
  }
});

// 样式
styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e5eaeb',
    flex: 1,
    height: 70,
    paddingLeft: 10,
    paddingRight: 10
  },
  step: {
    flex: 1,
    flexDirection: 'column'
  },
  progress: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  progressActive: {

  },
  index: {
    backgroundColor: '#C5C5C2',
    color: '#FFF',
    width: 24,
    height: 24,
    lineHeight: 20,
    borderRadius: 12,
    textAlign: 'center',
    position: 'absolute',
    left: 46,
    top: 11
  },
  indexActive: {
    backgroundColor: '#FC7200'
  },
  indexFirst: {
    left: 25
  },
  indexLast: {
    left: null,
    right: 15
  },
  line: {
    flex: 1,
    borderTopWidth: 3,
    borderTopColor: '#C5C5C2',
    position: 'relative'
  },
  lineActive: {
    borderTopColor: '#FC7200'
  },
  desc: {
    flex: 1,
    textAlign: 'center',
    color: '#65686a',
    fontSize: 12
  },
  //
  alignLeft: {
    textAlign: 'left'
  },
  alignRight: {
    textAlign: 'right'
  }

});
