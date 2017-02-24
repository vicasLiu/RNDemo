'use strict';

import React, { Component } from 'react';
var Core = require("../../core/core");
var $http = require("../../services/services");
var Widget = require('../../widget/widget.js');
// var PayPage = require("../cashDesk/payPage");
var keyMap = {};
var skbKey = '';
var reKeyMap = {};
var reSkbKey = '';
var interval = 1;
var commParam = null;
var fromPage = '';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,Alert, AlertIOS,
} from 'react-native';
var {
    Password,
    Separator,
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
        'repeatPasswordKey': obj.rePassKey,
        'repeatPassword': obj.rePassword,
        'validate': '1'
    };
    $http.post({
        url : "clientAPI/resetPassword",
        data : Object.assign(commParam, pwdData),
        success : function( data ) {
            cb(data);
        }
    });
};
var RPView = React.createClass({
    _initState : function() {
        return {
            password : null,
            rePassword : null,
            passKey : null,
            rePassKey : null,
            passMap : null,
            rePassMap : null
        }
    },
    getInitialState : function() {
        var obj = this._initState();
        return obj;
    },
    onInputPassword : function( text ) {
        console.info(text);
        var navigator = this.props.navigator;
        var _this = this;
        if( text.length == 6 ) {
            if( interval == 2 ) {
                _this.refs.loading.show();
                var rMap = this.state.rePassMap;
                resoleKey(text, rMap, function(arr){
                     _this.setState({
                         rePassword : arr
                     });
                });
                setPasswordData(_this.state, function( data ){
                    _this.refs.loading.hide();
                    if (data.code === '200') {
                        console.info("resetPassword success!");
                        if( fromPage == 'cask_desk' ) {
                            Core.nextPage("PayPage", {
                                commParam : data.data
                            }, navigator);
                        }
                        if( fromPage == 'redeem' ) {
                            Core.nextPage("RedeemPage", {
                                commParam : data.data
                            }, navigator);
                        }
                    } else {
                        Alert.alert(data.message);
                        _this.refs.password.setState({
                            password: ''
                        });
                        interval = 1;
                        var obj = _this._initState();
                        _this.setState(obj);
                        getSKBKey(commParam, function( data ){
                            _this.setState({
                                passKey : data.key,
                                passMap : data.encodeMap
                            });
                        });
                    }
                });
            }else{
                var map = this.state.passMap;
                resoleKey( text, map, function( arr ){
                    _this.setState({
                        password : arr
                    });
                });
                this.refs.password.setState({
                    password: ''
                });
                getSKBKey(commParam, function( data ){
                    _this.setState({
                        rePassMap : data.encodeMap,
                        rePassKey : data.key
                    });
                });
            }
            interval++;
        }
    },
    componentDidMount : function() {
        commParam = this.props.commParam;
        fromPage = this.props.fromPage;
        var _this = this;
        if( commParam == undefined ) {
            commParam = {};
        }
        getSKBKey(commParam, function( data ){
            _this.setState({
                passKey : data.key,
                passMap : data.encodeMap
            });
        });
    },
    render : function() {
        return(
            <ScrollView style={{backgroundColor:"#E6E9EB"}}>
                <Loading ref='loading'></Loading>
                <View style={{flex:1}}>
                    <View style={{flexDirection:'column'}}>
                        <View style={{flex:1,alignSelf: 'stretch',justifyContent: 'center', alignItems:'center',marginTop:40}}>
                            <Text>请设置六位数交易密码</Text>
                        </View>
                    </View>
                    <View style={{flex:1,flexDirection:'row', alignSelf: 'stretch',justifyContent: 'center', alignItems:'center', marginTop:40}}>
                        <Password ref="password"
                          onChange={this.onInputPassword}/>
                    </View>
                </View>
            </ScrollView>
        )
    }
});

module.exports = RPView;
