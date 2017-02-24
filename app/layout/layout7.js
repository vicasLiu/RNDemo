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
        },
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
        },
        '交易时间': {
          label: '交易时间',
          type: 'Text',
          props: {
            value: '2016-03-30 12:59:59'
          }
        }
      }
    };
  },


  render: function(){

    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
        <RN.ScrollView>
          <View>
            <View style={[Style.padding, {backgroundColor:'#FFF'}]}>

              <View style={[Style.mix('center', 'flexRow', 'center'), {marginTop: 50}]}>
                <Widget.Icon 
                  icon="success"
                  />
                <Text style={[Style.mix('text'), {
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginLeft: 10
                }]}>交易成功</Text>
              </View>

              <View style={[Style.mix('center'), {height: 50}]}>
                <Text style={[Style.mix('text')]}>实付金额 ￥5</Text>
              </View>

              <Widget.Separator />

              <View style={[Style.mix('center', 'row')]}>
                <Text>订单详情</Text>
              </View>

              <Widget.Form ref="form" type="detail" ref="form1"
                rowStyle={{
                  paddingTop: 10,
                  paddingBottom: 10
                }}
                labelStyle={{
                  width: 70
                }}
                children={this.state.form1}
              />

            </View>

            <Button text="完成" ref="btnNext"/>
            
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

  }
});

module.exports = layout;