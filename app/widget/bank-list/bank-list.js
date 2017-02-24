'use strict';
import React, { Component } from 'react';
var Checkbox = require('../checkbox/checkbox');
var Style = require('../style/style');

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,Alert, AlertIOS,
} from 'react-native';

var styles, alert = Alert.alert;

var BankList = React.createClass({

  data: [],
  
  //
  getInitialState: function(){
    return {
      banks: BankList.banks,
      cards: this.props.cards || []
    };
  },

  getData: function(){
    var banks = this.state.banks, 
      cards = this.state.cards,
      data = [];

    if(cards.length){
      cards.forEach(function(card){
        var bank = banks[card.bank];
        if(bank){
          bank = Object.assign({}, bank, { 
            number: card.number,
            checked: card.checked,
            bankCode : card.bankCode
          });
          data.push(bank);
        };
      });
      
    }else{
      Object.keys(banks).forEach(function(bankName){
        data.push(banks[bankName]);
      });
    };

    return data;
  },

  checkboxs: [],

  check: function(selectIndex){
    var fn = this.props.onSelect || function(){};
    var item = this.data[selectIndex] || {};

    if(fn){
      if(fn({ bankName: item.text, number: item.number || '', bankCode : item.bankCode || '' }) === false){
        return;
      }
    };

    this.data.forEach(function(item, index){
      var checkbox = this.refs['checkbox'+index];

      if(checkbox){
        checkbox.setState({
          checked: index === selectIndex
        });
      };
    }.bind(this));
  },

  // 取得一个Item
  getItem: function(item, index){
    var self = this;
    var text = item.text;
    var key = 'row' + index;
    var checkboxRef = 'checkbox' + index;
    var onPress = function(){
      self.check(index);
      return false;
    };

    if(item.number){
      text += '（' + item.number.substr(-4) + '）';
    };

    // 解决通过setState刷新列表时，checkbox的checked不生效的问题
    // 临时解决方案
    // setTimeout(function(){
    //   self.refs[checkboxRef].setState({
    //     checked: item.checked
    //   });
    // }, 0);

    return (
      <TouchableOpacity key={key}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <View style={[Style.mix('row'), styles.row]}>
          <Image
            style={styles.image}
            source={item.image} />
          <Text
            style={styles.text}>{text}</Text>
          <Checkbox
            type="circle"
            ref={checkboxRef}
            style={styles.checkbox}
            checked={item.checked}
            onChange={onPress}
          />
        </View>
      </TouchableOpacity>
    );
  },

  getEmptyMsg: function(msg){
    
    return (
      <View style={[Style.mix('row'), styles.row]} key="empty">
        <Text
          style={Style.mix('text', 'remark', 'flex')}></Text>
      </View>
    );
  },

  // 取得全部Item
  getItems: function(){
    var items = [], 
      data = this.data = this.getData(), 
      self = this,
      emptyMsg = this.state.cards && this.state.cards.length ? '没有银行卡' : '没有银行数据';

    data.forEach(function(item, index){
      items.push(self.getItem(item, index));
    });

    if(items.length === 0){
      items.push(self.getEmptyMsg('没有银行卡'));
    };

    return items;
  },

  //
  render: function(){
    return (
      <View
        style={styles.container}>
        {this.getItems()}
      </View>
    );
  }
});


// 银行列表
BankList.banks = {
  abc: {
    image: require('./images/icon_abc@2x.png'),
    text: '中国农业银行'
  },
  boc: {
    image: require('./images/icon_boc@2x.png'),
    text: '中国银行'
  },
  ccb: {
    image: require('./images/icon_ccb@2x.png'),
    text: '中国建设银行'
  },
  icbc: {
    image: require('./images/icon_icbc@2x.png'),
    text: '中国工商银行'
  },
  bcm: {
    image: require('./images/icon_bcm@2x.png'),
    text: '交通银行'
  },
  ceb: {
    image: require('./images/icon_ceb@2x.png'),
    text: '光大银行'
  },
  cib: {
    image: require('./images/icon_cib@2x.png'),
    text: '兴业银行'
  },
  citic: {
    image: require('./images/icon_citic@2x.png'),
    text: '中信银行'
  },
  cncb: {
    image: require('./images/icon_cncb@2x.png'),
    text: '中信银行（国际）'
  },
  cmb: {
    image: require('./images/icon_cmb@2x.png'),
    text: '招商银行'
  },
  cmbc: {
    image: require('./images/icon_cmbc@2x.png'),
    text: '民生银行'
  },
  gdb: {
    image: require('./images/icon_gdb@2x.png'),
    text: '广东发展银行'
  },
  hxb: {
    image: require('./images/icon_hxb@2x.png'),
    text: '华夏银行'
  },
  pab: {
    image: require('./images/icon_pab@2x.png'),
    text: '平安银行'
  },
  psbc: {
    image: require('./images/icon_psbc@2x.png'),
    text: '中国邮政储蓄银行'
  },
  spdb: {
    image: require('./images/icon_spdb@2x.png'),
    text: '浦发银行'
  }
};

// styles
styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#EEEEEE',
    paddingTop: 13,
    paddingBottom: 13
  },
  image:{
    width: 20,
    height: 20,
    marginLeft: 0
  },
  text:{
    flex: 1,
    marginLeft: 20
  },
  checkbox: {
    width: 20,
    height: 20
  }
});

module.exports = BankList;