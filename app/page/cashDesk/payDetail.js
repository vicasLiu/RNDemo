'use strict';

import React, { Component } from 'react';
var core = require("../../core/core");
var $http = require('../../services/services');
var commParam = null;
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
var orderNotifyUrl = '';
var getOrderDetail = function( cb ) {
    $http.post({
        url : 'clientAPI/getPayResult',
        data : commParam,
        success : function( data ) {
            console.info(data);
            if( data.code == '200' ) {
                cb(data);
            }
            orderNotifyUrl = data.orderNotifyUrl;
        }
    });
};
var PayDetail = React.createClass({
    getFormItems : function( formData ) {
        var _this = this;

        formData = Object.assign({
            tradeNo: '',
            amount : 0,
            merchantName : '',
            productName : '',
            endTime : ''
        }, formData);
        if( formData.amount > 0 ) {
            formData.amount = formData.amount / 100;
        }
        return [{
                label: '订单编号',
                type: 'Text',
                props: {
                  value: formData.tradeNo || ''
                }
              },
              {
                label: '订单金额',
                type: 'Text',
                props: {
                  value: '￥' + (formData.amount || '0')
                }
            },{
              label: '收款方',
              type: 'Text',
              props: {
                value: formData.merchantName
              }
          },{
            label: '商品',
            type: 'Text',
            props: {
              value: formData.productName
            }
        },{
          label: '交易时间',
          type: 'Text',
          props: {
            value: formData.endTime
          }
        }];
    },
    getInitialState: function(){
        var self = this;

        return {

            telphone: '',
            amount : 0,
            agree: false,

            form1: self.getFormItems()
        };
  },
  updateForm : function( obj ) {
      var form = this.refs.form;
      form.setState({
          children: this.getFormItems(obj)
      });
  },
  componentDidMount : function() {
      commParam = this.props.commParam;
      if( commParam == undefined ) {
          commParam = {};
      }
      var _this = this;
      getOrderDetail(function( data ){
          _this.setState({
              amount : data.amount / 100
          });
          _this.updateForm(data);
      });
  },
  completePress : function() {
      var navigator = this.props.navigator;
      Core.nextPage('CompletePage', {
          uri : orderNotifyUrl
      }, navigator);
  },
  render: function(){
    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
        <RN.ScrollView>
          <View>
            <View style={[Style.padding, {backgroundColor:'#FFF'}]}>

              <View style={[Style.mix('center', 'flexRow', 'center'), {marginTop: 50}]}>
                <Widget.Icon
                  icon="success-40-40"
                  />
                <Text style={[Style.mix('text'), {
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginLeft: 10
                }]}>交易成功</Text>
              </View>

              <View style={[Style.mix('center'), {height: 50}]}>
                <Text style={[Style.mix('text')]}>实付金额 ￥{this.state.amount}</Text>
              </View>

              <Widget.Separator />

              <View style={[Style.mix('center', 'row')]}>
                <Text>订单详情</Text>
              </View>

              <Widget.Form ref="form" type="detail"
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

            <Button text="完成" ref="btnNext" onPress={this.completePress} />

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

module.exports = PayDetail;
