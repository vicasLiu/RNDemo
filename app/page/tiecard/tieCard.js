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
// var BankListPage = require("./selectBanklist");
// var VCodePage = require("./vcodePage");

var commParam = null;
var fromPage = '';

var initPage = function( obj, cb ) {
    //带出持卡人
    $http.post({
        url: obj.url,
        data: commParam,
        success: function (data) {
            console.info(data);
            if (data.code == 1) {
                cb(data.data);
            } else {
                Alert.alert(data.message);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            Alert.alert('网络异常');
        }
    });
};
var bindCardData = function( obj, cb ) {
    var param = {
        'mobile': obj.telphone,
        'bankCardNo': obj.cardNo,
        'bankCode': obj.bankCode,
        'bankName': obj.BankName
    };
    $http.post({
        url : "clientAPI/sendSMSCode",
        data : Object.assign(commParam, param),
        success : function( data ) {
            console.info(data);
            cb( data );
        }
    });
};
var TieCard = React.createClass({

    // 取得表单
    getForm2Items: function(formData){

        var _this = this;

        formData = Object.assign({
            username: ''
        }, formData);

        return [{
            label: '卡号',
            type: 'TextInput',
            props: {
              maxLength: 20,
              placeholder: '请输入银行卡号',
              value: formData.cardNo || '',
              keyboardType: 'numeric',
              onBlur : function() {
                  _this._onCardBlur();
              },
              onChange: function( event ){
                  var value = event.nativeEvent.text;
                  _this._handleCChange(value);
              }
            }
        },{
            label: '持卡人',
            type: 'Text',
            text: formData.username || ''
        },{
            label: '手机号',
            type: 'TextInput',
            props: {
              maxLength: 11,
              placeholder: '请输入银行预留手机号',
              keyboardType: 'numeric',
              value: formData.telphone || '',
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
            form1 : [{
                label: '请选择银行',
                type: 'Text',
                text: '请选择银行',
                props: {
                    onPress : function() {
                        _this.onChangeFocus();
                    }
                }
            }],
            form2 : this.getForm2Items(),
            cardNo : "",
            cardName : "",
            bankCode : "",
            phoneNum : "",
            BankInfo : null,
            userName : "",
            telphone : "",
            cardFlg : false,
            agree : false,
            BankName : "请选择银行"
        }
    },
    _disableButton : function() {
        var state = this.state;
        if( util.isMobile(state.telphone) && state.cardFlg && state.agree ) {
            this.refs.btn.setState({
                disabled : false
            });
        }
    },
    _onCardBlur : function() {
        var _this = this;
        var state = this.state;
        $http.post({
            url : "clientAPI/getBankCardInfo",
            data : Object.assign(commParam, {'bankCardNo': state.cardNo, 'bankCode': state.bankCode}),
            success : function( data ) {
                if (data.code === '200') {
                    _this.setState({
                        cardFlg : true
                    });
                } else {
                    _this.setState({
                        cardFlg : false
                    });
                    Alert.alert(data.message);
                }
                _this._disableButton();
            }
        });
    },
    _handleCChange : function( text ) {
        this.setState({
            cardNo : text
        });
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
    onChangeFocus : function() {
        var _this = this;
        var navigator = this.props.navigator;
        Core.nextPage("SelectBanklistPage", {
            commParam : commParam,
            getBankInfo : function( obj ) {
                _this.setState({
                    // BankInfo : obj
                    BankName : obj.bankName,
                    bankCode : obj.bankCode
                });
            }
        }, navigator);
        this._disableButton();
    },
    onPress : function() {
        var navigator = this.props.navigator;
        var obj = this.state;
        this.refs.loading.show();
        var _this = this;
        bindCardData(obj, function( data ){
            _this.refs.loading.hide();
            if (data.code === '200') {
                Core.nextPage("VerificationPage", {
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
        console.info(commParam);
        if( commParam == undefined ) {
            commParam = {};
        }
        var obj = {
            url : 'cashierAPI/getUserInfo'
        };
        var _this = this;
        if( fromPage == 'addNew' ) {
            obj.url = 'cashierAPI/getCurrentUserInfo';
        }
        initPage(obj, function( data ){
            if( fromPage == 'addNew' ) {
                _this.updateForm({
                    username : data.cardOwnerName
                });
            }else{
                _this.updateForm({
                    username : data.bankCardOwner
                });
            }
        });
    },
    // 更新表单内容
    updateForm: function(data){
        var form2 = this.refs.form;
        form2.setState({
            children: this.getForm2Items(data)
        });
    },
    onAgree : function() {
        var agree = !this.state.agree;
        this.setState({
            agree : agree
        });
        this._disableButton();
    },
    render : function() {
        return (
            <ScrollView style={[styles.container]}>
                <View>
                    <Loading ref='loading'></Loading>
                    
                    <SelectButton 
                        style={{marginTop:10, marginBottom: 10}}
                        text={this.state.BankName} onPress={this.onChangeFocus} />

                    <Form 
                        ref="form" children={this.state.form2} />

                    <Widget.Agree
                        onChange={this.onAgree}
                        onRead={this.onRead}
                    />
                    <Widget.Button text="下一步" disabled="true" ref='btn' onPress={this.onPress}></Widget.Button>
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

module.exports = TieCard;
