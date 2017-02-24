'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,Alert, AlertIOS,
} from 'react-native';

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


  getInitialState: function(){
    var self = this;

    return {

      telphone: '',
      
      agree: false,
      
      form: {
        'telphone': {
          label: '手机号',
          type: 'TextInput',
          props: {
            valid: 'required',
            maxLength: 11,
            keyboardType: 'numbers-and-punctuation',
            placeholder: '请输入银行预留手机号',
            onChangeText: function(text){
              self.state.telphone = text;
              self.refreshBtnNextState();
            }
          }
        }
      }
    };
  },

  refreshBtnNextState: function(){
    var btn = this.refs.btnNext;
    var yes = this.state.agree && (this.state.telphone.length === 11);
    btn.setState({
      disabled: yes !== true
    });
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
    bankList.check(cards.length-1);
  },

  onAgree: function(agree){
    this.state.agree = agree;
    this.refreshBtnNextState();
  },

  onRead: function(){
    Alert.alert('用户协议');
  },

  render: function(){
    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
        <RN.ScrollView>
          <View>
            <View style={[Style.mix('textRow', 'flexRow')]}>
              <Text style={[Style.mix('text'), {paddingTop: 1}]}>请输入</Text>
              <Widget.Link style={[Style.mix('')]} text="中信银行 储蓄卡（3208）" />
              <Text style={[Style.mix('text'), {paddingTop: 1}]}>的预留手机号</Text>
            </View>

            <Widget.Form ref="form" ref="form"
              children={this.state.form}
              style={{marginTop: 5}}
            />

            <Widget.Agree 
              onChange={this.onAgree}
              onRead={this.onRead}
            />

            <Button text="下一步" disabled="true" ref="btnNext"/>
            
            <View style={[Style.mix('textRow', 'center')]}>
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