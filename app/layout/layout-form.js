'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,Alert, AlertIOS,
} from 'react-native';

var Widget = require('../widget/widget.js');

var {
  Style,
  Form,
  Button
} = Widget;

var alert = Alert.alert;

var layout = React.createClass({

  submit: function(){
    var form = this.refs.form;
    var err = form.getError();
    if(err){
      Alert.alert(err);
    }else{
      Alert.alert('验证成功');
    };
  },

  getInitialState: function(){
    return {
      form: {
        'area': {
          label: '地区',
          type: 'Text',
          props: {
            value: '中国'
          }
        },
        'name': {
          label: '姓名',
          type: 'TextInput',
          props: {
            maxLength: 20,
            placeholder: '请输入本人姓名',
            value: '张家辉',
            onChange: function(){
              //Alert.alert('123');
            }
          }
        },
        'idnumber': {
          label: '身份证号码',
          type: 'TextInput',
          props: {
            value: '',
            valid: 'required',
            maxLength: 18,
            keyboardType: 'numbers-and-punctuation',
            placeholder: '请输入本人身份证',
            placeholderTextColor: '#ff6600',
            style: {
              color: '#ff6600'
            }
          }
        }
      }
    };
  },

  onInputPassword: function(text){
    var btn = this.refs.btnNext;

    if(text.length === 6){
      btn.setState({
        text: '下一步',
        disabled: false
      });
    }else{
      btn.setState({
        text: '请填写表单',
        disabled: true
      });
    }
  },

  render: function(){
    return (
      <View style={Style.mix('page', 'flex')}>
        <RN.ScrollView>
          <View>
            <Form ref="form" children={this.state.form} ref="form" />
            <Button text="请填写表单" ref="btnNext" disabled="true" />
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