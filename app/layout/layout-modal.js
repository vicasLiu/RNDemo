'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,Alert, AlertIOS,
} from 'react-native';

var alert = Alert.alert;

var Widget = require('../widget/widget.js');

var {
  Style,
  Button,
  Password,
  Link
} = Widget;

var layout = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  onInputPassword: function(text){

    if(text.length === 6){
      alert('密码错误');
    }
  },

  onPay: function(){
    var modal = this.refs.modal;
    modal.open();
  },

  render: function(){
    return (
      <View style={Style.mix('page', 'flex')}>
        <RN.ScrollView>
          <View>
            <Button
              text="立即支付" onPress={this.onPay}/>
          </View>
        </RN.ScrollView>

        <Widget.Modal ref="modal" closeText="取消支付">

          <View style={[Style.mix('center'), {height: 50}]}>
            <Text style={Style.text}>还需支付</Text>
            <Text style={[Style.text, {paddingTop:5}]}>￥5</Text>
          </View>

          <Password ref="password" 
            onChange={this.onInputPassword}/>

          <View style={[Style.mix('center', 'row', 'flexRow'), {height: 50}]}>
            <Text style={Style.text}>中信银行储蓄卡 (9526) 支付</Text>
            <Link text="更换&gt;" onPress={
              function(){
                alert('9527');
              }
            } />
          </View>
          
        </Widget.Modal>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;