'use strict';

import React, { Component } from 'react';
var Core = require("../../core/core");
var $http = require("../../services/services");
// var BindCard = require("./bindCard");
var Widget = require('../../widget/widget.js');
var keyMap = {};
var skbKey = '';
var reKeyMap = {};
var reSkbKey = '';
var interval = 1;
var commParam = null;
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
    Loading,
    Steps
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
        url : "clientAPI/setPassword",
        data : Object.assign(commParam, pwdData),
        success : function( data ) {
            cb(data);
        }
    });
};
var PView = React.createClass({
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
                this.refs.loading.show();
                var rMap = this.state.rePassMap;
                resoleKey(text, rMap, function(arr){
                     _this.setState({
                         rePassword : arr
                     });
                });
                setPasswordData(_this.state, function( data ){
                    _this.refs.loading.hide();
                    if (data.code === '200') {
                        console.info("setPassword success!");
                        //idCardExist:1为 未实名，但该身份证已在信通宝平台注册过 ；0为 未实名，该身份证没有在信通宝平台注册过
                        //realName:1为 已实名 ；0为 未实名
                        Core.nextPage("BindCardPage", {
                            commParam : data.data
                        }, navigator);
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
                <Loading ref="loading" />
                <View style={{flex:1}}>
                    <View style={{height: 80, borderBottomWidth:1, borderBottomColor:"#999", flex:1}}>
                        <Steps style={{flex:1}} activeIndex="1"></Steps>
                    </View>
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

module.exports = PView;
