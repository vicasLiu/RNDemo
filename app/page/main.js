'use strict';

import React, { Component } from 'react';

import RN, {
    StyleSheet,
    View,
    TextInput,
    Text, 
    Alert
} from 'react-native';

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
import NavMinin from '../core/nav-mixin.js';

import Widget, {
  Style,
  SelectButton,
  Button,
} from '../widget/widget.js'

import Form from '../ui/form.js'

var layout = React.createClass({

    mixins: [NavMinin],

    // 跳转到
    go: function(name){
        return function(){
        this.push(name);
        }.bind(this);
    },

    submit: function () {
        if(!this.username) return Alert.alert('请输入用户名');
        if(!this.password) return Alert.alert('请输入密码');
    },

    getInitialState: function () {
      var self = this;

      return {
        // 用户名
        username: '',
        // 密码
        password: '',
        //
        form: {

          'username': {
            label: '用户名',
            type: 'TextInput',
            valid: ['required'],
            props: {
              maxLength: 20,
              placeholder: '请输入用户名',
              value: '',
              onChange: function (text) {
                self.setState({
                  username: text
                });
              }
            }
          },

          'password': {
            label: '密码',
            type: 'TextInput',
            props: {
              maxLength: 8,
              placeholder: '请输入密码',
              value: '',
              onChange: function (text) {
                self.setState({
                  password: text
                });
              }
            }
          },

        }
      };
    },

    render: function () {
        return (
            <View style={[Style.mix('page', 'flex'), styles.container]}>
                <RN.ScrollView>
                    <View>
                        <View style={[styles.pic]}>
                          <Text>商户登录</Text>
                        </View>
                        <Form>
                          <Text>123</Text>
                        </Form>
                        <Button text="登录" ref="btnNext" onPress={this.submit} />
                    </View>
                </RN.ScrollView>
            </View>
        );
    }
});

// styles
var styles = StyleSheet.create({
  container: {
    marginTop: 24
  },
  pic: {
    height: 200,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    //backgroundColor: '#E84F1E',
  },
  row:{
    flexDirection: 'row',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  firstRow: {
    borderTopWidth: 0
  },
  label: {
    width: 100,
    textAlign: 'left',
    color: '#484848',
    fontSize: Style.fontSize
  },
  input: {
    flex:3,
    fontSize: Style.fontSize,
    textAlign: 'left'
  },
  text: {
    color: '#484848',
  },
  textInput: {
    color: '#ababab',
    height: Style.fontSize + 2
  }
});

module.exports = layout;