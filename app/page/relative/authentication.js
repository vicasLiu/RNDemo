'use strict';

import React, { Component } from 'react';
var Core = require("../../core/core");
var util = require("../../core/util");
var $http = require("../../services/services");
var Steps = require("../../widget/steps/steps");
var Form = require("../../widget/form/form");
var Widget = require('../../widget/widget');
var API = require('../../api/api');
// var PayPage = require("../cashDesk/payPage");
// var RelativeTieCard = require("./relativeTieCard");
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
var bindData = function( obj, cb ) {
    $http.post({
        url : 'clientAPI/validRelationshipUsername',
        data : Object.assign(commParam, {
            "parentUsername" : obj.userName
        }),
        success : function( data ) {
            console.info(data);
            cb(data);
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
var Authentication = React.createClass({
    // 取得表单
    getForm2Items: function(formData){
        var _this = this;
        formData = Object.assign({
            username: ''
        }, formData);
        return [{
            label: '主账户名',
            type: 'TextInput',
            props: {
              maxLength: 20,
              placeholder: '请输入本人主账户名',
              value: formData.username || '',
              onChange: function( event ){
                  var value = event.nativeEvent.text;
                  _this._handleCChange(value);
              }
            }
        }];
    },
    _handleCChange : function( value ) {
        this.setState({
            userName : value
        });
        this._disableButton();
    },
    getInitialState : function() {
        var _this = this;
        return {
            form2 : this.getForm2Items(),
            userName : "",
            agree : false,
            isSign : 'error'
        }
    },
    _disableButton : function() {
        var state = this.state;
        if( state.userName!='' && state.agree ) {
            this.refs.btn.setState({
                disabled : false
            });
        }
    },
    onAgreePress : function( data ) {
        var navigator = this.props.navigator;
        Core.nextPage('AgreementPage', {
            commParam : commParam,
            agreeObj : data
        }, navigator);
    },
    onPress : function() {
        var navigator = this.props.navigator;
        var obj = this.state;
        var _this = this;
        if( !this.refs.btn.disabled ) {
            this.refs.loading.show();
            bindData(obj, function( data ){
                _this.refs.loading.hide();
                if( data.code == 1 ) {
                    Core.nextPage("PayPage", {
                        commParam : data.data
                    }, navigator);
                }else{
                    Alert.alert(data.message);
                }
            });
        }
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
    componentDidMount : function() {
        commParam = this.props.commParam;
        console.info(commParam);
        if( commParam == undefined ) {
            commParam = {};
        }
        var _this = this;
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
    onAgree : function() {
        var agree = !this.state.agree;
        this.setState({
            agree : agree
        });
        this._disableButton();
    },
    onChangeType : function() {
        var navigator = this.props.navigator;
        // console.info();
        navigator.pop();
        // Core.nextPage(RelativeTieCard, {
        //     commParam : commParam
        // }, "关联认证", navigator);
    },
    render : function() {
        var AgreeView = this.state.isSign != 'error' ?
            (<Widget.Agree
                  onChange={this.onAgree}
                  onRead={this.onRead}
                />) : (<View />);
        return (
            <ScrollView style={[styles.container]}>
                <Loading ref='loading'></Loading>
                <View>

                    <View style={[Style.mix('textRow', 'flexRow')]}>
                        <Text style={[Style.mix('text')]}>请输入您的主账户名，以验证身份</Text>
                    </View>
                    
                    <Form ref="form" children={this.state.form2} />
                    
                    {AgreeView}

                    <Widget.Button text="下一步" disabled="true" ref='btn' onPress={this.onPress}></Widget.Button>
                    
                    <View style={[Style.mix('textRow', 'flexRow')]}>
                      <Text 
                        style={[Style.mix('text', 'smallText')]} 
                        ref="txtPayCard">换个验证方式:</Text>
                      <Widget.Link 
                        text="验证银行卡信息进行关联认证&gt;" 
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

module.exports = Authentication;
