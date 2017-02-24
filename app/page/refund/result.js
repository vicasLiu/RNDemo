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

var getOrderDetail = function( cb ) {
    $http.post({
        url : 'clientAPI/getPayResult',
        data : commParam,
        success : function( data ) {
            console.info(data);
            if( data.code == '200' ) {
                cb(data);
            }
        }
    });
};
var RedeemResultPage = React.createClass({
    getInitialState: function(){
        var self = this;
        return {
            icon : 'success-40-40',
            text : ''
        };
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
  render: function(){
    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
        <RN.ScrollView>
          <View>
            <View style={[Style.padding, {backgroundColor:'#FFF'}]}>
              <View style={[Style.mix('center', 'flexRow', 'center'), {marginTop: 50}]}>
                <Widget.Icon
                  icon={this.state.icon}
                  />
                <Text style={[Style.mix('text'), {
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginLeft: 10
              }]}>{this.state.text}</Text>
              </View>
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
var styles = StyleSheet.create({
  container: {

  }
});

module.exports = RedeemResultPage;
