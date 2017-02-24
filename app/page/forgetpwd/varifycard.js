'use strict';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ScrollView,Alert, AlertIOS,
} from 'react-native';

// 工具
var Core = require("../../core/core");
var util = require("../../core/util");
var $http = require("../../services/services");

// 控件
var Widget = require('../../widget/widget');
var {
    Style,
    Steps,
    Form,
    SelectButton,
    Loading
} = Widget;

// 页面
// var VCodePage = require("./varifycode");
var fromPage = '';
var commParam = null;
var initPage = function( cb ) {
    $http.post({
        url: 'clientAPI/getBankCardInfoForResetPwd',
        data: commParam,
        success: function (data) {
            console.info(data);
            if (data.code === '200') {
                cb(data);
            } else {
                Alert.alert(data.message);
            }
        }
    });
};
var bindCardData = function( obj, cb ) {
    var param = {
        'mobile': obj.telphone,
        'bankCardNo': obj.cardNo,
        'bankCode': obj.bankCode,
        'bankName': obj.BankName,
        'idCardNO' : obj.idCard,
        'bankCardOwner' : obj.userName,
        'idCardType': 1
    };
    $http.post({
        url : "clientAPI/sendSMSCodeForResetPwd",
        data : Object.assign(commParam, param),
        success : function( data ) {
            console.info(data);
            cb(data);
        }
    });
};
var VarifyCard = React.createClass({
    // 取得表单
    getForm2Items: function(formData){
        var _this = this;
        return [{
            label: '卡号',
            type: 'TextInput',
            props: {
              maxLength: 20,
              placeholder: '请输入银行卡号',
              keyboardType: 'numeric',
              onChange: function( event ){
                  var value = event.nativeEvent.text;
                  _this._handleCChange(value);
              }
            }
        },{
            label: '持卡人',
            type: 'TextInput',
            props : {
                placeholder: '请输入持卡人姓名',
                onChange: function( event ){
                    var value = event.nativeEvent.text;
                    _this._handleChangeName(value);
                }
            }
        },{
            label: '身份证号',
            type: 'TextInput',
            props : {
                placeholder: '请输入身份证号',
                onChange: function( event ){
                    var value = event.nativeEvent.text;
                    _this._handleChangeIDCard(value);
                }
            }
        },{
            label: '手机号',
            type: 'TextInput',
            props: {
              maxLength: 11,
              placeholder: '请输入银行预留手机号',
              keyboardType: 'numeric',
              onChange: function( event ){
                  var value = event.nativeEvent.text;
                  _this._handleChange(value);
              }
            }
        }];
    },

    getInitialState : function() {
        var _this = this;
        return {
            form2 : this.getForm2Items(),
            cardNo : "",
            cardName : "",
            bankCode : "",
            userName : "",
            telphone : "",
            bankCardInfo : '',
            idCard : ''
        }
    },
    _disableButton : function() {
        var state = this.state;
        if( util.isMobile(state.telphone) && state.cardNo != '' && state.userName!=''&&state.idCard!='') {
            this.refs.btn.setState({
                disabled : false
            });
        }
    },
    _handleCChange : function( text ) {
        this.setState({
            cardNo : text
        });
        this._disableButton();
    },
    _handleChange : function( text ) {
        var state = this.state;
        if( util.isMobile(text) ) {
            this.setState({
                telphone : text
            });
            this._disableButton();
        }
    },
    _handleChangeName : function( text ) {
        this.setState({
            userName : text
        });
        this._disableButton();
    },
    _handleChangeIDCard : function( text ) {
        this.setState({
            idCard : text
        });
        this._disableButton();
    },
    onPress : function() {
        this.refs.loading.show();
        var navigator = this.props.navigator;
        var obj = this.state;
        var _this = this;
        bindCardData(obj, function( data ){
            _this.refs.loading.hide();
            if (data.code === '200') {
                Core.nextPage("VarifyCodePage", {
                    commParam : commParam,
                    mobile : obj.telphone,
                    bankCardNo : obj.cardNo,
                    bankCode : obj.bankCode,
                    bankName : obj.BankName,
                    fromPage : fromPage
                }, navigator);
            } else {
                Alert.alert(data.message);
            }
        });
    },
    componentDidMount : function() {
        commParam = this.props.commParam;
        fromPage = this.props.fromPage;
        var _this = this;
        initPage(function(data){
            _this.setState({
                bankCardInfo : data.bankCardInfo
            });
        });
    },
    render : function() {
        return (
            <ScrollView style={[styles.container]}>
                <Loading ref='loading'></Loading>
                <View>
                    <View style={[Style.mix('row')]}>
                      <Text style={[Style.mix('text')]}>请输入{this.state.bankCardInfo}信息</Text>
                    </View>
                    
                    <Form style={{marginTop:10}} ref="form" children={this.state.form2} />
                    
                    <Widget.Button style={{marginTop:10}} text="下一步" disabled="true" ref='btn' onPress={this.onPress}></Widget.Button>
                    
                </View>

            </ScrollView>
        )
    }
});
var styles = StyleSheet.create({
    container:{
    	backgroundColor:'#E6E9EB',
    	flex:1,
  	}
});

module.exports = VarifyCard;
