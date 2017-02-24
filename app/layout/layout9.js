'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,Alert, AlertIOS,
} from 'react-native';

var Widget = require('../widget/widget.js');

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
var NavMinin = require('../core/nav-mixin.js');

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

  getInitialState: function(){
    var selectedCardNo = this.props.selectedCardNo;

    return {
      selectedCardNo: selectedCardNo,
      cards: [
        {
          number: '2342342234239527',
          bank: 'cncb'
        },
        {
          number: '2342342342349528',
          bank: 'cncb',
          checked: true
        },
        {
          number: '2342342343242321',
          bank: 'citic'
        }
      ]
    };
  },

  addCard: function(){
    var cards = this.state.cards;
    var bankList = this.refs.bankList;
    // 添加银行卡
    cards.push({
      number: createCardNumber(),
      bank: 'bcm'
    });
    bankList.setState({
      cards: cards
    });
    // 选中最后一张
    //bankList.check(cards.length-1);
  },

  onBankSelect: function(card){
    //alert(card.bankName + card.cardNumber);
    // this.push('layout9');
    // this.props.navigator.push('layout9');
  },

  render: function(){
    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
        <RN.ScrollView>
          <View>
            <View style={[Style.mix('row')]}>
              <Text style={[Style.mix('text')]}>请验证银行卡信息确保本人操作</Text>
            </View>
            <BankList cards={this.state.cards} 
              onSelect={this.onBankSelect}
              ref="bankList"/>
            <SelectButton text="添加新的银行卡" onPress={this.addCard} />
            <Button text="下一步" onPress={this.method('push', 'layout10')} />
            <View style={[Style.mix('row', 'center')]}>
              <Text style={[Style.mix('text', 'remark')]}>信通宝正在保障您的账户安全，请放心使用</Text>
            </View>
          </View>
        </RN.ScrollView>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({
  container: {

  }
});

module.exports = layout;