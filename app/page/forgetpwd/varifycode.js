'use strict';
import React, { Component } from 'react';
var Core = require("../../core/core");
var $http = require("../../services/services");
// var ResetPwd = require("./resetpwd");
var VCode = require('../../widget/vcode/vcode');
var Button = require('../../widget/button/button');
var Loading = require('../../widget/loading/loading');
var commParam = null;
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableHighlight,Alert, AlertIOS,
} from 'react-native';
var fromPage = '';
var bindCard = function( obj, cb ) {
    var data = {
        smsCode: obj.code,
        bankCardNo: obj.bankCardNo,
        bankName: obj.bankName,
        bankCode: obj.bankCode,
        mobile: obj.tel,
        "_ihome_form_token" : obj.token
    };
    $http.post({
        url : obj.url,
        data : Object.assign(commParam, data),
        success : function( data ) {
            console.info(data);
            if( data.code == '200' ) {
                cb(data);
            }else{
                Alert.alert(data.message);
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
var formatMobile = function( val ) {
    if( val == undefined ) {
		return "";
	}
	var str = "";
	for( var i = 0; i < val.length; i++ ) {
		if( i > 2 && i < 7 ) {
			str += "*";
		}else{
			str += val[i];
		}
	}
	return str;
};
var VCodePage = React.createClass({
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
        obj.url = 'clientAPI/checkSMSCode';
        this.refs.loading.show();
        var _this = this;
        bindCard(obj, function( data ){
            _this.refs.loading.hide();
            console.info(data);
            if( data.code == '200' ) {
                Core.nextPage("ResetPwdPage",{
                    commParam : data.data,
                    fromPage : fromPage
                }, navigator);
            }else{
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
        var m = this.props.mobile;
        var bankCardNo = this.props.bankCardNo;
        var bankName = this.props.bankName;
        var bankCode = this.props.bankCode;
        this.setState({
            mobile : formatMobile(m),
            tel : m,
            bankCardNo : bankCardNo,
            bankName :bankName,
            bankCode : bankCode
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
    render : function() {
        return(
            <ScrollView style={[styles.container]}>
                <View>
                    <Loading ref='loading'></Loading>
                    <View style={{flex:1, flexDirection:'column',alignSelf: 'stretch',justifyContent: 'center', alignItems:'center',marginTop:20}}>
                        <Text style={{flex:1, color:"gray", fontSize:14}}>短信验证码已发送至您的手机</Text>
                        <Text style={{flex:1, color:"gray", fontSize:12}}>{this.state.mobile}</Text>
                    </View>
                    <VCode ref="vcode"
		    	style={{marginTop:10}}
                        label='验证码'
                        placeholder='请输入验证码'
                        buttonText='发送'
                        maxLength={6}
                        count={60}
                        onChange={this.onVCodeChange}
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
module.exports = VCodePage;
