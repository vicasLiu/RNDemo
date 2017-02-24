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
  BankList,
  Form,
  Agree
} = Widget;

var createCardNumber = function(){
  var no = '', len = 19;
  for(var i = 0; i < len; i++){
    no += parseInt(Math.random()*10, 10);
  };
  return no;
};

var layout = React.createClass({

  getInitialState: function(props){

    return {
      form: {
        'number': {
          label: '卡号',
          type: 'TextInput',
          props: {
            valid: 'required',
            maxLength: 19,
            keyboardType: 'numbers-and-punctuation',
            placeholder: '请输入银行卡号'
          }
        },
        'name': {
          label: '持卡人',
          type: 'TextInput',
          props: {
            valid: 'required',
            maxLength: 20,
            placeholder: '请输入本人姓名'
          }
        },
        'telphone': {
          label: '手机号',
          type: 'TextInput',
          props: {
            valid: 'required',
            maxLength: 11,
            keyboardType: 'numbers-and-punctuation',
            placeholder: '请输入银行预留手机号'
          }
        }
      }
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
    bankList.check(cards.length-1);
  },

  selectBank: function(){
    this.props.navigator.push('layout9', {
      title: 'LAYOUT9',
      passProps: {
        selectedCardNo: '2342342342349528'
      }
    });
  },

  render: function(){
    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
        <RN.ScrollView>
          <View>
            <SelectButton text="请选择银行" onPress={this.selectBank} />

            <Form ref="form" ref="form"
              children={this.state.form}
              style={{marginTop: 20}}
            />

            <Agree 
              agree={true}
              agreeText="不同意" 
              linkText="（用户协议）" 
              linkStyle={{}}
              textStyle={{}}
              />

            <Button text="下一步" />

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
    paddingTop: Style.pixel
  }
});

module.exports = layout;