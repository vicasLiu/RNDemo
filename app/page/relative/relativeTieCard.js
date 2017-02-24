'use strict';

import React, { Component } from 'react';
var Core = require("../../core/core");
var util = require("../../core/util");
var $http = require("../../services/services");
var Form = require("../../widget/form/form");
var SelectButton = require('../../widget/select-button/select-button');
var Widget = require('../../widget/widget');
var API = require('../../api/api');
// var VCodePage = require("../bindCard/vcodePage");
// var Authentication = require("./authentication");
var commParam = null;
var AgreeList = [];
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    ScrollView,Alert, AlertIOS,
} from 'react-native';
var {
  Style,
  Loading
} = Widget;
var {
    ActionSheet
} = API;
var initPage = function( cb ) {
    //带出持卡人
    $http.post({
        url: 'cashierAPI/getUserInfo',
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
var isSignProtocol = function( cb ) {
    $http.get({
        url : 'agreement_tmp_list_unsign',
        data : Object.assign(commParam, {sceneType : 'TP_CUSTOMER_APPLY'}),
        success : function( data ) {
            console.info(data);
            if( data.code == 1 ) {
                cb(data.data);
            }else{
                cb('error');
            }
        }
    });
};
var RelativeTieCard = React.createClass({

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
            showTips : false,
            tipsText: '温馨提示：光大银行卡需开通电子支付功能',
            BankName : "请选择银行",
            isSign : 'error'
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
                if( obj.bankCode == 'CEB' ) {
                    _this.setState({
                        showTips : true
                    });
                }else{
                    _this.setState({
                        showTips : false
                    });
                }
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
                Core.nextPage("VCodePage", {
                    commParam : commParam,
                    mobile : obj.telphone,
                    bankCardNo : obj.cardNo,
                    bankCode : obj.bankCode,
                    bankName : obj.BankName,
                    flg : "relative"
                }, navigator);
            } else {
                Alert.alert(data.message);
            }
        });
    },
    componentDidMount : function() {
        commParam = this.props.commParam;
        console.info(commParam);
        if( commParam == undefined ) {
            commParam = {};
        }
        var _this = this;
        initPage(function( data ){
            _this.updateForm({
                username : data.bankCardOwner
            });
        });
        isSignProtocol(function(data){
            if( data == 'error' ) {
                _this.setState({
                    isSign : 'error',
                    disabled : false
                });
            }else {
                _this.setState({
                    isSign : 'suc'
                });
                AgreeList = data.list;
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
    onAgreePress : function( data ) {
        var navigator = this.props.navigator;
        Core.nextPage('AgreementPage', {
            commParam : commParam,
            agreeObj : data
        }, navigator);
    },
    onRead : function() {
        var a = [];
        for( var i = 0; i < AgreeList.length; i++ ) {
            a.push({
                text : AgreeList[i].agreementName,
                data : AgreeList[i],
                onPress : this.onAgreePress
            });
        }
        ActionSheet(a);
    },
    onChangeType : function() {
        var navigator = this.props.navigator;
        Core.nextPage("AuthentcationPage", {
            commParam : commParam
        }, navigator);
    },
    render : function() {
        var AgreeView = this.state.isSign != 'error' ? (
            <Widget.Agree
              onChange={this.onAgree}
              onRead={this.onRead}
            />
        ) : (
            <View></View>
        );
        return (
            <ScrollView style={[styles.container]}>
                <View>
                    <Loading ref='loading'></Loading>

                    <View style={[Style.mix('textRow', 'flexRow')]}>
                        <Text style={[Style.mix('text', 'smallText')]}>您可以使用已绑定过的银行卡进行验证，也可以绑定新卡进行验证</Text>
                    </View>

                    <SelectButton 
                        style={{marginBottom: 10}}
                        text={this.state.BankName} onPress={this.onChangeFocus} />
                    
                    {this.state.showTips && (
                        <View style={[Style.mix('row'), {paddingTop:10, paddingBottom: 20}]}>
                          <Text style={[Style.mix('text', 'remark')]}>{this.state.tipsText}</Text>
                        </View>
                    )}

                    <Form ref="form" children={this.state.form2} />

                    {AgreeView}

                    <Widget.Button text="下一步" disabled="true" ref='btn' onPress={this.onPress}></Widget.Button>
                    
                    <View style={[Style.mix('textRow', 'flexRow')]}>
                      <Text 
                        style={[Style.mix('text', 'smallText')]} 
                        ref="txtPayCard">换个验证方式:</Text>
                      <Widget.Link 
                        text="验证主账户名进行关联认证&gt;" 
                        textStyle={[Style.mix('smallText')]} 
                        onPress={this.onChangeType} />
                    </View>

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

module.exports = RelativeTieCard;
