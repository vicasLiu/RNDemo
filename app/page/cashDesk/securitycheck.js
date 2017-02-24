'use strict';
import React, { Component } from 'react';
var Core = require("../../core/core");
var $http = require("../../services/services");
// var PayDetail = require("./payDetail");

// 控件
var Widget = require('../../widget/widget');
var {
    Style,
    VCode,
    Button,
    Loading
} = Widget;

var commParam = null;
var fromPage = '';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableHighlight,Alert, AlertIOS,
} from 'react-native';
var CheckSecurity = function( obj, cb ) {
    var data = {
        smsCode: obj.code,
        "_ihome_form_token" : obj.token
    };
    $http.post({
        url : "cashierAPI/verifySms",
        data : Object.assign(commParam, data),
        success : function( data ) {
            console.info(data);
            cb(data);
        }
    });
};
var resend = function() {
    $http.post({
        url: 'cashierAPI/reSendSms',
        data: commParam,
        success: function (data) {
            if (data.code == 1) {

            } else {

            }
        }
    });
};
//获取防重token
var getClickToken = function(cb){
	$http.post({
		url : 'getToken',
        data : commParam,
		success : function(data){
            console.info(data);
			if(data.code == 1){
				cb(data.data);
			}
		}
	});
};
var SecurityPage = React.createClass({
    getInitialState : function() {
        return {
            mobile : '',
            tel : '',
            bankCardNo : '',
            code : '',
            bankName : '',
            bankCode : '',
            token : ''
        }
    },
    onPress : function() {
        var navigator = this.props.navigator;
        var obj = this.state;
        var flg = this.props.flg;
        var _this = this;
        CheckSecurity(obj, function( data ){
            if (data.code == 1) {
                if( fromPage == 'redeem' ) {
                    Core.nextPage("RedeemResultPage", {
                        commParam : data.data
                    }, navigator);
                }else{
                    Core.nextPage("PayDetailPage", {
                        commParam : data.data
                    }, navigator);
                }
            } else {
                _this.setState({
                    token : data.token
                });
                Alert.alert(data.message);
            }
        });
    },
    componentDidMount : function() {
        commParam = this.props.commParam;
        fromPage = this.props.fromPage;
        console.info(commParam);
        if( commParam == undefined ) {
            commParam = {};
        }
        var mobile = this.props.mobile;
        this.setState({
            mobile : mobile
        });
        this.refs.vcode.send();
        var _this = this;
        getClickToken(function( str ){
            _this.setState({
                token : str
            });
        });
    },
    onVCodeChange : function( event ) {
        var value = event.nativeEvent.text;
        if( value.length == 6 ) {
            this.setState({
                code : value
            });
            this.refs.btn.setState({
                disabled : false
            });
        }
    },
    onVCodePress : function() {
        this.refs.vcode.send();
        resend();
    },
    render : function() {
        return(
            <ScrollView style={[styles.container]}>
                <View>

                    <View style={[Style.mix('textRow', 'center')]}>
                      <Text style={[Style.mix('text', 'remark')]}>为了验证您的账户是否安全，已发送验证码至您的银行预留手机号</Text>
                      <Text style={[Style.mix('text', 'remark')]}>{this.state.mobile}</Text>
                    </View>

                    <VCode ref="vcode"
                        label='验证码'
                        placeholder='请输入验证码'
                        buttonText='发送'
                        maxLength={6}
                        count={60}
                        onChange={this.onVCodeChange}
                        onPress={this.onVCodePress}
                        style={{
                          backgroundColor: '#FFF'
                        }}
                      />

                    <Button text="下一步" disabled="true" ref='btn' onPress={this.onPress}></Button>
                    
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
module.exports = SecurityPage;
