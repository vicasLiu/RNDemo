'use strict';
import React, { Component } from 'react';
var Core = require("../../core/core");
var Services = require("../../services/services");
var Util = require("../../core/util");

// var SetPassword = require("./setPassword");
// var Authentication = require("../relative/validatePwd");

import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ScrollView,
    ActivityIndicatorIOS,
    Modal,
    Dimensions,Alert, AlertIOS,
} from 'react-native';

// 控件
var Widget = require('../../widget/widget');
var {
    Style,
    Form,
    Loading,
    Button,
    Steps
} = Widget;

var UserInfoPage = React.createClass({
    getInitialState : function() {
        var _this = this;
        return {
            active : false,
            activeOpacity : 1,
            userName : "",
            underlayColor : "#999",
            btnColor : "#999",
            userName : "",
            idCard : "",
            isLoading : false,
            formItem : [{
                label: '姓名',
                type: 'TextInput',
                props: {
                  maxLength: 4,
                  placeholder: '请输入本人姓名',
                  value: '',
                  onChange: function( event ){
                      _this.onChangeName(event);
                  },
                  onBlur : function() {
                      var value = _this.state.userName;
                      if( value.length < 2 && value != "") {
                          Alert.alert("姓名长度不能小于2");
                          _this.setState({active:false});
                          _this.refs.btn.setState({
                              disabled: true
                          });
                      }
                  }
                }
            },{
                label: '身份证号码',
                type: 'TextInput',
                props: {
                  maxLength: 18,
                  placeholder: '请输入本人身份证',
                  value: '',
                  keyboardType:'numbers-and-punctuation',
                  onChange: function( event ){
                      _this.onChangeIDCard(event);
                  },
                  onBlur : function() {
                      var value = _this.state.idCard;
                      if( !Util.isIDCard(value) && value != "" ) {
                          Alert.alert("请输入正确的省份证号");
                          _this.setState({active:false});
                          _this.refs.btn.setState({
                              disabled: true
                          });
                      }
                  }
                }
            }]
        }
    },
    onChangeName : function( event ) {
        this.setState({
            userName : event.nativeEvent.text
        });
        if( this.state.userName != "" && this.state.idCard != "" ) {
            this.refs.btn.setState({
                disabled: false
            });
        }else{
            this.refs.btn.setState({
                disabled: true
            });
        }
    },
    onChangeIDCard : function( event ) {
        var text = event.nativeEvent.text;
        this.setState({
            idCard : text
        });
        if( this.state.userName != "" && this.state.idCard != "" ) {
            if( Util.isIDCard(this.state.idCard) ) {
                this.refs.btn.setState({
                  disabled: false
                });
            }
        }else{
            this.refs.btn.setState({
              disabled: true
            });
        }
    },
    nextBtnPress : function() {
        var navigator = this.props.navigator;
        var obj = this.props.commParam;
        var _this = this;
        if( !this.refs.btn.disabled ) {
            this.refs.loading.show();
            Services.post({
                url : "cashierAPI/existsCardNO",
                data : Object.assign(obj, {
                    'idCardType': '1',
                    'bankCardOwner': this.state.userName,
                    'idCardNO': this.state.idCard,
                    'secure': true
                }),
                success : function( data ) {
                    _this.refs.loading.hide();
                    console.info(data);
                    if( data.code == 1 ) {
                        if( data.data.existsCNO == 1 ) {
                            //未实名，但已开通过信通宝账户。1关联认证，2绑卡
                            console.log("跳转到关联认证流程");
                            //1、认证原账户名和交易密码
                            //2、认证银行卡（老卡&新卡）
                            //idCardExist:1为 已实名，但该身份证已在信通宝平台注册过 ；0为 未实名，该身份证没有在信通宝平台注册过
                            //realName:1为 已实名 ；0为 未实名

                            //判断商户类型
                            if( obj.merchantType == 2) {
                                Core.nextPage("TieCardPage", {
                                    commParam : obj
                                }, navigator);
                            }else{
                                Alert.alert(
                                    '温馨提示',
                                    "该身份证已在信通宝平台注册过，您可以验证主账户名或银行卡信息进行关联认证",
                                    [
                                      {text: 'OK', onPress: () => Core.nextPage("ValidatePwdPage",{commParam:obj}, navigator)},
                                    ]
                                );
                            }
                        }else{
                            console.log("跳转到设置交易密码流程");
                            Core.nextPage("SetPasswordPage", {
                                commParam : obj
                            }, navigator);
                        }
                    }else{
                        Alert.alert(data.message);
                    }
                }
            });
        }
    },
    render : function() {
        return (
            <ScrollView style={[styles.container]}>
                <View style={{}}>
                  <Loading ref="loading" />
                  <Steps style={{flex:1}} activeIndex="0"></Steps>
                  <Form ref="form" children={this.state.formItem} />
                  
                  <Button text="下一步" ref='btn' disabled="true" onPress={this.nextBtnPress}></Button>
                  
                </View>
            </ScrollView>
        )
    }
});
var styles = StyleSheet.create({
    container:{
    	backgroundColor:'#E6E9EB',
    	flex:1
  	},
});
module.exports = UserInfoPage;
