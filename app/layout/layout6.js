'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert, 
  AlertIOS,
} from 'react-native';

var Widget = require('../widget/widget.js');

var {
  Style,
  SelectButton,
  Button,
  alert,
  BankList,
  Modal
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

      remark: '这张卡的支付限额是XXXX',
      
      form1: {
        '订单编号': {
          label: '订单编号',
          type: 'Text',
          props: {
            value: '中顺易-DREP-27428742894728472868747'
          }
        },
        '订单金额': {
          label: '订单金额',
          type: 'Text',
          props: {
            value: '￥5'
          }
        }
      },
      
      form2: {
        '收款方': {
          label: '收款方',
          type: 'Text',
          props: {
            value: '马立可'
          }
        },
        '商品': {
          label: '商品',
          type: 'Text',
          props: {
            value: '接送车服务'
          }
        }
      }
    };
  },

  onPay: function(){
    var modal = this.refs.modal;
    modal.open();
  },

  onChangePayCard: function(){
    //
  },


  render: function(){
    //var source = require('./fence.png');

    return (
      <View style={{flex:1}}>
        <View style={[Style.mix('page', 'flex'), styles.container]}>
          <RN.ScrollView>
            <View style={{backgroundColor: '#FFF'}}>

              <Widget.Form ref="form" ref="form1"
                type="detail"
                rowStyle={{
                  height: 30
                }}
                style={{
                  marginTop: 10
                }}
                children={this.state.form1}
              />

              <View style={styles.fence}>
                <Widget.Icon icon="fence" />
              </View>

              <Widget.Form ref="form" ref="form2"
                children={this.state.form2}
              />
            </View>
            <View>

              <View style={[Style.mix('textRow', 'flexRow', 'center'), {height: 80}]}>
                <Text style={[Style.mix('text')]}>还需支付</Text>
                <Widget.Link textStyle={[Style.mix('strong', 'bigText', 'red')]} text="￥5" />
              </View>

              <Button text="立即支付" ref="btnNext" onPress={this.onPay}/>
              
              <View style={[Style.mix('textRow', 'center')]}>
                <Text style={[Style.mix('text', 'remark')]}>本服务由信通宝提供支持</Text>
              </View>
            </View>
          </RN.ScrollView>
          <Widget.Modal ref="modal">

            <View style={[Style.mix('center'), {height: 50}]}>
              <Text style={Style.text}>还需支付</Text>
              <Text style={[Style.text, {paddingTop:5}]}>￥5</Text>
            </View>

            <Widget.Password ref="password" 
              keyboardFixed={false}
              onChange={this.onInputPassword}/>

            <View style={[Style.mix('center', 'row', 'flexRow'), {height: 50}]}>
              <Text style={Style.text} ref="txtPayCard">中信银行储蓄卡 (9526) 支付</Text>
              <Widget.Link text="更换&gt;" onPress={this.onChangePayCard} />
            </View>

            { this.state.remark && (
                <View style={[Style.mix('center')]}>
                  <Text style={[Style.mix('text', 'remark')]} >{this.state.remark}</Text>
                </View>
            )}
          </Widget.Modal>
        </View>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({
  container: {

  },
  fence: {
    height: 40
  }
});

module.exports = layout;