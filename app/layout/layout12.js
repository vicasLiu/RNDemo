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


  render: function(){
    //var source = require('./fence.png');

    return (
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

            <Button text="立即支付" ref="btnNext"/>
            
            <View style={[Style.mix('textRow', 'center')]}>
              <Text style={[Style.mix('text', 'remark')]}>本服务由信通宝提供支持</Text>
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

  },
  fence: {
    height: 40
  }
});

module.exports = layout;