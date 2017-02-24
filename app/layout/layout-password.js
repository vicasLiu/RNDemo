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
    var btn = this.refs.btnShowPassword;

    if(text.length === 6){
      btn.setState({
        text: '显示密码',
        disabled: false
      });
    }else{
      btn.setState({
        text: '请输入密码',
        disabled: true
      });
    }
  },

  showPassword: function(){
    var pwd = this.refs.password.getValue();
    if(!pwd){
      alert('密码为空');
    }else{
      alert(pwd);
    };
  },

  render: function(){
    return (
      <View style={Style.mix('page', 'flex')}>
        <RN.ScrollView>
          <View>

            <View style={[Style.mix('center'), {height: 50}]}>
              <Text style={Style.text}>还需支付</Text>
              <Text style={[Style.text, {paddingTop:5}]}>￥5</Text>
            </View>
            
            <Password ref="password" keyboard={true} onChange={this.onInputPassword} />
            
            <View style={[Style.mix('center', 'row', 'flexRow'), {height: 50}]}>
              <Text style={Style.text}>中信银行储蓄卡 (9526) 支付</Text>
              <Link text="更换&gt;" onPress={
                function(){
                  alert('9527');
                }
              } />
            </View>

            <Button ref="btnShowPassword"
              disabled="true"
              text="请输入密码" onPress={this.showPassword}/>
            
          </View>
        </RN.ScrollView>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;