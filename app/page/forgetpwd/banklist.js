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
  BankList,
  Loading
} = Widget;
// var VarifyCard = require("./varifycard");

var commParam = null;
var fromPage = '';
var getBankList = function( cb ) {
    $http.post({
        url : 'clientAPI/getCustomerBindingCardList',
        data : commParam,
        success : function( data ) {
            console.info(data);
            cb(data);
        }
    });
};
var nextBtnPress = function(obj,cb) {
    $http.post({
        url: 'clientAPI/chooseBank',
        data: Object.assign(commParam, {
            'bankCardNo': obj.cardNo,
            'bankCode': obj.bankCode
        }),
        success: function (data) {
            console.info(data);
            cb(data);
        }
    });
};
var FPWDBankList = React.createClass({

  getInitialState: function(){
    return {
      cards: [

      ],
      bankCode : '',
      bankName : '',
      cardNo : ''
    };
  },
  updateCard : function( arr ) {
      var cards = this.state.cards;
      var bankList = this.refs.bankList;
      for( var i = 0; i < arr.length; i++ ) {
          // 添加银行卡
          if( i == 0 ) {
              cards.push({
                checked : true,
                number : arr[i].cardNo,
                bankCode : arr[i].bankCode,
                bank: arr[i].bankCode.toLocaleLowerCase()
              });
          }else{
              cards.push({
                number : arr[i].cardNo,
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
  onBankSelect: function(card){
      console.info(card);
      //alert(card.bankName + card.number);
      var btn = this.refs.btn.setState({
          disabled : false
      });
      this.setState({
          bankCode : card.bankCode,
          bankName : card.bankName,
          cardNo : card.number
      });
  },
  componentDidMount : function() {
      commParam = this.props.commParam;
      fromPage = this.props.fromPage;
      var _this = this;
      this.refs.loading.show();
      getBankList(function( data ){
          _this.refs.loading.hide();
          if( data.code == '200' ) {
              _this.updateCard(data.data);
          }else{
              Alert.alert(data.message);
          }
      });
  },
  nextPress : function() {
      if( !this.refs.btn.disabled ) {
          var navigator = this.props.navigator;
          nextBtnPress(this.state, function( data ){
              if( data.code == '200' ) {
                  Core.nextPage("VarifyCardPage", {
                      commParam : commParam,
                      fromPage : fromPage
                  }, navigator);
              }else{
                  Alert.alert(data.message);
              }
          });
      }
  },
  render: function(){
    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
        <RN.ScrollView>
            <Loading ref='loading'></Loading>
          <View>
            <View style={[Style.mix('row')]}>
              <Text style={[Style.mix('text')]}>请验证银行卡信息确保本人操作</Text>
            </View>
            <BankList cards={this.state.cards}
              onSelect={this.onBankSelect}
              ref="bankList"/>
          <Button ref='btn' text="下一步" disabled="true" onPress={this.nextPress} />
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

module.exports = FPWDBankList;
