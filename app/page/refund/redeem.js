'use strict';

import React, { Component } from 'react';
var Core = require("../../core/core");
var $http = require("../../services/services");
var Widget = require('../../widget/widget.js');
// var RelativeTieCard = require("./relativeTieCard");
var keyMap = {};
var skbKey = '';
var commParam = null;
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,Alert, AlertIOS,
} from 'react-native';
var {
    Style,
    Password,
    Loading
} = Widget;

//获取安全键盘
var getSKBKey = function( obj, cb ) {
    $http.post({
        url : "clientAPI/newKeyCode",
        data : Object.assign(obj, {'validate':1}),
        success : function( data ) {
            console.info(data);
            cb(data);
        }
    });
};
var resoleKey = function( text, map, cb ) {
    console.info(map);
    var arr = [];
    for( var i = 0; i < text.length; i++ ) {
        var k = text[i];
        arr.push(map[k]);
    }
    cb(arr);
};
var setPasswordData = function( obj, cb ) {
    var pwdData = {
        'password': obj.password,
        'passwordKey': obj.passKey,
        'validate': '1',
        '_ihome_form_token' : obj.ihomeToken
    };
    $http.post({
        url: 'clientAPI/redeem',
        data: Object.assign(pwdData, commParam),
        success: function (data) {
            cb(data);
        }
    });
};
var initPage = function(cb) {
    $http.post({
        url : 'clientAPI/getRedeemInfo',
        data : commParam,
        success : function( data ) {
            if( data.code == 1 ) {
                cb(data.data);
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
var ValidatePwd = React.createClass({
    getInitialState : function() {
        return {
            password : null,
            passKey : null,
            passMap : null,
            amount : '',
            bankName : '',
            cardNo : '',
            ihomeToken : ''
        }
    },
    _init : function() {
        var _this = this;
        _this.refs.password.setState({
            password: ''
        });
        getSKBKey(commParam, function( data ){
            _this.setState({
                passKey : data.key,
                passMap : data.encodeMap
            });
        });
    },
    _forgetPassword : function() {
        var navigator = this.props.navigator;
        Core.nextPage("BankListPage", {
            commParam : commParam,
            fromPage : 'redeem'
        }, navigator);
    },
    _resolveData : function( data ) {
        var _this = this;
        var navigator = this.props.navigator;
        if (data.code == 1) {
            Core.nextPage("RedeemResultPage", {
                commParam : commParam
            }, navigator);
        } else if( data.code == '22509' ) { //密码错误
            this.setState({
                ihomeToken : data.token
            });
            Alert.alert('温馨提示',
            data.message,
            [
              {text: '重新输入', onPress: () => _this._init()},
              {text: '忘记密码', onPress: () => _this._forgetPassword()}
            ]);
        }else if( data.code == '22512' ) {//密码锁定
            this.setState({
                ihomeToken : data.token
            });
            Alert.alert('温馨提示',
            data.message,
            [
              {text: '取消', onPress: () => _this._init()},
              {text: '忘记密码', onPress: () => _this._forgetPassword()}
            ]);
        }else if( data.code == '1051' ) {  //风控
            Core.nextPage('SecurityPage', {
                commParam : commParam,
                mobile : data.data,
                fromPage : 'redeem'
            }, navigator);
        }else{
            this.setState({
                ihomeToken : data.token
            });
            Alert.alert('温馨提示',
            data.message,
            [
              {text: 'OK', onPress: () => _this._init()}
            ]);
        }
    },
    onInputPassword : function( text ) {
        console.info(text);
        var _this = this;
        if( text.length == 6 ) {
            _this.refs.loading.show();
            var map = this.state.passMap;
            resoleKey( text, map, function( arr ){
                _this.setState({
                    password : arr
                });
            });
            var obj = this.state;
            setPasswordData(obj, function( data ){
                console.info(data);
                _this.refs.loading.hide();
                _this._resolveData(data);
            });
        }
    },
    componentDidMount : function() {
        commParam = this.props.commParam;
        var _this = this;
        _this.refs.loading.show();
        initPage(function( data ){
            _this.setState({
                amount : data.amount,
                bankName : data.bankName,
                cardNo : data.cardNo
            });
            getClickToken(function( d ){
                _this.setState({
                    ihomeToken : d
                });
            });
            getSKBKey(commParam, function( data ){
                _this.refs.loading.hide();
                _this.setState({
                    passKey : data.key,
                    passMap : data.encodeMap
                });
            });
        });
    },
    render : function() {
        return(
            <ScrollView style={{backgroundColor:"#E6E9EB"}}>
                <View style={{flex:1}}>
                    <Loading ref='loading'></Loading>

                    <View style={[Style.mix('textRow', 'center'), {marginTop:40}]}>
                      <Text style={[Style.mix('text', 'remark')]}>请输入您的交易密码，以验证身份</Text>
                    </View>

                    <Password ref="password" 
                          onChange={this.onInputPassword}/>

                    <View style={[Style.mix('textRow', 'center')]}>
                        <Text style={[Style.mix('text', 'remark')]}>
                            赎回金额:￥{this.state.amount}
                        </Text>

                        <Text style={[Style.mix('text', 'remark'), {marginTop:10}]}>
                            赎回到{this.state.bankName} 储蓄卡({this.state.cardNo})
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
});

module.exports = ValidatePwd;
