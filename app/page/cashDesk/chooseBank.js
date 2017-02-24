'use strict';

import React, { Component } from 'react';
var Core = require("../../core/core");
var $http = require("../../services/services");

import RN, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,Alert, AlertIOS,
} from 'react-native';

var Widget = require('../../widget/widget.js');

var {
  Style,
  SelectButton,
  Button,
  alert,
  BankList
} = Widget;
var commParam = null;
var getBankList = function ( cb ) {
    $http.post({
        url: 'clientAPI/getPaymentList',
        data: commParam,
        success: function (data) {
            console.info(data);
            if( data.code == '200' ) {
                cb(data.data);
            }else{
                Alert.alert(data.message);
            }
        }
    });
};
var ChooseBank = React.createClass({
  getInitialState: function(){
    return {
      cards: [

      ]
    };
  },
  addCard : function( arr ) {
      var cards = this.state.cards;
      var bankList = this.refs.bankList;
      for( var i = 0; i < arr.length; i++ ) {
          // 添加银行卡
          if( i == 0 ) {
            //   cards.push({
            //     checked : true,
            //     number : arr[i].cardNo,
            //     bankCode : arr[i].bankCode,
            //     bank: arr[i].bankCode.toLocaleLowerCase()
            //   });
          }else{
              cards.push({
                number : arr[i].bankCardNo,
                bankCode : arr[i].bankCode,
                bank: arr[i].bankCode.toLocaleLowerCase()
              });
          }
      }
    //   console.info(cards);
      bankList.setState({
        cards: cards
      });
      // 选中第一张
      bankList.check(0);
  },
  addNewCard : function() {
      var navigator = this.props.navigator;
      console.info(this);
    //   Core.backPage("PayPage", {}, navigator);
      Core.nextPage("ValidatePwdNPage", {
          commParam : commParam,
          fromPage : 'addNew'
      }, navigator);
  },
  componentDidMount : function() {
      commParam = this.props.commParam;
      var _this = this;
      getBankList(function( arr ){
          _this.addCard(arr);
      });
  },
  render: function(){
    return (
        <RN.ScrollView style={[styles.container]}>
          <View>
            <BankList 
                cards={this.state.cards} ref="bankList"/>
            <SelectButton 
                style={{marginTop: 10, marginBottom: 10}}
                text="添加新的银行卡" onPress={this.addNewCard} />
            <Button text="下一步" />
            <View style={[Style.mix('row', 'center')]}>
              <Text style={[Style.mix('text', 'remark')]}>信通宝正在保障您的账户安全，请放心使用</Text>
            </View>
          </View>
        </RN.ScrollView>
    );
  }
});

// styles
var styles = StyleSheet.create({
  container: {
      backgroundColor:'#E6E9EB',
      flex:1,
  }
});

module.exports = ChooseBank;
