'use strict';
import React, { Component } from 'react';
var Core = require("../../core/core");
var $http = require("../../services/services");
// var PayDetail = require("./payDetail");
// var SecurityPage = require("./securitycheck");
// var ChooseBank = require("./chooseBank");
// var BankListPage = require("../forgetpwd/banklist");
var Form = require("../../widget/form/form");
var Button = require('../../widget/button/button');
var Link = require("../../widget/link/link");
var Widget = require('../../widget/widget.js');
var API = require('../../api/api');
var commParam = null;
var tradeNo = '';
var skbKey = '';
var skbMap = null;
var password = [];
var bankCardNo = '';
var bankCode = '';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TouchableHighlight,Alert, AlertIOS,
} from 'react-native';
var {
  Style
} = Widget;
var {
    ActionSheet
} = API;
//获取订单详情
var getOrderInfo = function( obj, cb ){
    $http.post({
        url: 'clientAPI/getOrderInfo',
        data: Object.assign(commParam, {
            transCode : obj.transCode
        }),
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
//获取银行限额
var getBankLimit = function(bankCode){
    $http.post({
        url: 'cashierAPI/getBankQuotaInfo',
        data: Object.assign({'bankCode': bankCode}, commParam),
        success: function (data) {
            console.info(data);
            if (data.code == 1 && data.data) {

            } else {

            }
        }
    });
};
//获取安全键盘的key值
var getSkbKey = function() {
    $http.post({
        url: 'clientAPI/newKeyCode',
        data: Object.assign(commParam,{'validate':1}),
        success: function (data) {
            console.info(data);
            if (data.code === '200') {
                skbMap = data.encodeMap;
                skbKey = data.key;
            }
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
//获取默认支付方式
var resoleBankList = function( data ) {
    var banklist = data.bandingCardList;
    if( banklist ) {
        for( var i = 0; i < banklist.length; i++ ) {
            var bankInfo = banklist[i];
            if( bankInfo.isDefault == 1 ) {
                bankCardNo = bankInfo.cardNo;
                bankCode = bankInfo.bankCode;
                getBankLimit(bankCode);
                return bankInfo;
            }
        }
    }
    // if( data.data.banlanceAmount == 0 && (!banklist || !banklist.length) ) {
    //     Alert.alert("您还未绑定银行卡，请绑卡后支付");
    // }else if(data.data.banlanceAmount == 0 && banklist && banklist.length != 0) {
    //     var bankInfo = bandingCardList[0];
    //     localStorage.setItem("SELECTBANCK", JSON.stringify({
    //         paytype: '1',
    //         name: bankInfo.bankName + " 储蓄卡 (" + bankInfo.cardNo + ")",
    //         cardNo: bankInfo.cardNo,
    //         bankCode: bankInfo.bankCode
    //     }));
    //     bankCardNo = bankInfo.cardNo;
    //     bankCode = bankInfo.bankCode;
    //     $binder.setData({
    //         paytype: bankInfo.bankName + " 储蓄卡 (" + bankInfo.cardNo + ")"
    //     });
    //     getBankLimit(bankCode);
    //     createSKB();
    //     cb(bankInfo);
    // }else{
    //     $("#bankLimit").addClass("dn");
    //     $(".paydetail-dig-kk").removeClass("debitpay");
    //     $binder.setData({
    //         paytype: "余额"
    //     });
    //     localStorage.setItem("SELECTBANCK", JSON.stringify({
    //         paytype: '2'
    //     }));
    //     createSKB();
    // }
};
var getDefaultPay = function ( obj, cb ) {
    getCustomerCardList( cb );
};
var getCustomerCardList = function( cb ) {
    $http.post({
        url : "cashierAPI/getCustomerBindingCardList",
        data : commParam,
        success : function( data ) {
            if( data.code == 1 ) {
                var info = resoleBankList(data.data);
                cb(info);
            }else {
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
//支付
var pay = function( obj, cb ) {
    var data = Object.assign(commParam, {
        password: obj.pw,
        passwordKey: obj.key,
        transCode: tradeNo,
        _ihome_form_token: obj._ihome_form_token
    });
    // var SELECTBANCK = localStorage.getItem('SELECTBANCK') ? localStorage.getItem('SELECTBANCK') : "";
    // selectType = JSON.parse(SELECTBANCK);
    // if (SELECTBANCK) {
    //     selectType = JSON.parse(SELECTBANCK);
    // } else {
    //     selectType = null;
    // }
    // if (selectType != null) {
    //     paytype = selectType.paytype;
    // }
    var paytype = 1;
    if (paytype == 1) {
        $http.post({
            url: 'clientAPI/debitPayment',
            data: Object.assign(commParam, {
                password: obj.pw,
                passwordKey: skbKey,
                transCode: tradeNo,
                bankCode: bankCode,
                bankCardNo: bankCardNo,
                _ihome_form_token: obj._ihome_form_token,
                'protocolType': 'CUSTOMER_TRADE',
            }),
            success: function (dt) {
                console.info(dt);
                cb(dt);
                // if( dt.code == '200' ) {
                //     cb(dt);
                // }
            }
        });
    } else {
        $http.post({
            url: 'clientAPI/balancePayment',
            data: data,
            success: function (dt) {
                console.info(dt);
                // resolvePayData(dt);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                // alert.showInfo(RTNCODE.NETERROR);
            }
        });
    }
};
//获取是否有绑卡
var getTieCardInfo = function( cb ) {
    $http.post({
        url: 'cashierAPI/hasBindBankCard',
        data: commParam,
        success: function (data) {
            cb(data)
        }
    });
};
var getProtocol = function ( cb ) {
    $http.get({
        url : 'agreement_tmp_list',
        data : Object.assign(commParam, {sceneType:'TP_CUSTOMER_APPLY', ownerId : tradeNo}),
        success : function( data ) {
            console.info(data);
            if( data.code == 1 ) {
                cb(data.data.list);
            }else{
                Alert.alert(data.message);
            }
        }
    });
};
var PayPage = React.createClass({
    getForm1Items : function( formData ) {
        var _this = this;

        formData = Object.assign({
            tradeNo: '',
            amount : 0
        }, formData);
        if( formData.amount > 0 ) {
            formData.amount = formData.amount / 100;
        }
        return [{
                label: '订单编号',
                type: 'Text',
                props: {
                  value: formData.tradeNo || ''
                }
              },
              {
                label: '订单金额',
                type: 'Text',
                props: {
                  value: '￥' + (formData.amount || '0')
                }
              }];
    },
    getForm2Items : function( formData ) {
        var _this = this;

        formData = Object.assign({
            merchantName : '',
            productName : ''
        }, formData);

        return [{
                label: '收款方',
                type: 'Text',
                props: {
                  value: formData.merchantName
                }
              },
              {
                label: '商品',
                type: 'Text',
                props: {
                  value: formData.productName
                }
              }];
    },
    getInitialState : function() {
        return{
            form1: this.getForm1Items(),
            form2: this.getForm2Items(),
            amount : 0,
            "_ihome_form_token" : "",
            "showText" : "",
            agreeFlg : true,
            remark: '这张卡的支付限额是XXXX'
        }
    },
    updateForm : function( obj ) {
        var form1 = this.refs.formHeader;
        var form2 = this.refs.formBody;
        form1.setState({
            children: this.getForm1Items(obj)
        });
        form2.setState({
            children: this.getForm2Items(obj)
        });
    },
    onConfirm : function() {
        this.refs.password.setState({
            password: ''
        });
        getSkbKey();
    },
    forgetPassword : function() {
        var modal = this.refs.modal;
        modal.close();
        var _this = this;
        var navigator = _this.props.navigator;
        getTieCardInfo(function( data ){
            if( data.code == 1 ) {
                Core.nextPage("BankListPage", {
                    commParam : commParam,
                    fromPage : 'cask_desk'
                }, navigator);
            }
        });
    },
    nextCheck : function() {
        var modal = this.refs.modal;
        modal.close();
        var navigator = this.props.navigator;
        Core.nextPage("SecurityPage", {
            commParam : commParam
        }, navigator);
    },
    onInputPassword : function( text ) {
        if( text.length == 6 ) {
            var _this = this;
            resoleKey(text, skbMap, function( arr ){
                pay({
                    pw : arr,
                    _ihome_form_token : _this.state._ihome_form_token
                }, function( data ){
                    if( data.code == '200' ) {
                        console.info(data);
                        var modal = _this.refs.modal;
                        modal.close();
                        var navigator = _this.props.navigator;
                        Core.nextPage("PayDetailPage", {
                            commParam : data.data
                        }, navigator);
                    }else if( data.code == '22509' ){
                        Alert.alert(
                            '温馨提示',
                            data.message,
                            [
                              {text: '确定', onPress: () => _this.onConfirm()},
                              {text: '忘记密码', onPress: () => _this.forgetPassword()}
                            ]
                        );
                        _this.setState({
                            _ihome_form_token : data.token
                        });
                    }else if( data.code == '22558' ) {
                        Alert.alert(
                            '温馨提示',
                            data.message,
                            [
                              {text: '确定', onPress: () => _this.nextCheck()}
                            ]
                        );
                    }else{
                        _this.setState({
                            _ihome_form_token : data.token
                        });
                        Alert.alert(data.message);
                    }
                });
            });
        }
    },
    onPress : function() {
        if( !this.state.agreeFlg ) {
            Alert.alert('请确认勾选协议');
            return;
        }
        var _this = this;
        getSkbKey();
        getDefaultPay({}, function( info ){
            _this.setState({
                showText : info.bankName + " 储蓄卡 (" + info.cardNo + ")"
            });
            console.info(info);
        });
        var modal = this.refs.modal;
        modal.open();
    },
    onChangePayCard : function() {
        var modal = this.refs.modal;
        modal.close();
        var navigator = this.props.navigator;
        Core.nextPage("ChooseBankPage", {
            commParam : commParam
        }, navigator);
    },
    componentDidMount : function() {
        commParam = this.props.commParam;
        if( commParam == undefined ) {
            commParam = {};
        }
        tradeNo  = commParam.transCode;
        var _this = this;
        getOrderInfo({transCode:tradeNo}, function( data ){
            console.info(data);
            _this.setState({
                amount : (data.amount / 100)
            });
            _this.updateForm(data);
        });
        getClickToken(function( str ){
            _this.setState({
                "_ihome_form_token" : str
            });
        });
    },
    onAgreePress : function( data ) {
        var navigator = this.props.navigator;
        Core.nextPage('AgreementPage', {
            commParam : commParam,
            agreeObj : data
        }, navigator);
    },
    onRead : function() {
        var _this = this;
        getProtocol(function( arr ){
            var a = [];
            for( var i = 0; i < arr.length; i++ ) {
                a.push({
                    text : arr[i].agreementName,
                    data : arr[i],
                    onPress : _this.onAgreePress
                });
            }
            ActionSheet(a);
        });
    },
    onAgree : function() {
        var f = !this.state.agreeFlg;
        this.setState({
            agreeFlg : f
        });
    },
    render : function() {
        return(
            <ScrollView style={[styles.container]}>
                <View>
                    <View style={{backgroundColor: '#FFF'}}>
                        <View style={{flex:1, flexDirection:'row', backgroundColor:"#fff", marginTop:10}}>
                            <Widget.Form ref="formHeader"
                              type="detail"
                              rowStyle={{
                                height: 30
                              }}
                              style={{
                                marginTop: 10
                              }}
                              children={this.state.form1}
                            />
                        </View>
                        <View style={styles.fence}>
                          <Widget.Icon icon="fence" />
                        </View>
                    </View>
                    <View style={{flex:1, flexDirection:'row', backgroundColor:"#fff"}}>
                        <Widget.Form ref="formBody"
                          children={this.state.form2}
                        />
                    </View>
                    <View style={{
                            flex:1,
                            flexDirection:'column',
                            alignSelf: 'stretch',
                            justifyContent: 'center',
                            alignItems:'center',
                            marginTop : 10
                        }}>
                        <View style={[Style.mix('textRow', 'flexRow', 'center'), {height: 40}]}>
                          <Text style={[Style.mix('text')]}>还需支付</Text>
                          <Link textStyle={[Style.mix('strong', 'bigText', 'red')]} text="￥5" />
                        </View>
                    </View>
                    <Widget.Agree
                          onChange={this.onAgree}
                          onRead={this.onRead}
                          agree={true}
                          linkText="《产品相关协议及支付指令单》"
                        />
                    <Button style={{flex:1, marginTop: 20, backgroundColor:'red'}} text="立即支付" theme='gay' onPress={this.onPress} />
                    <View style={[Style.mix('textRow', 'center')]}>
                      <Text style={[Style.mix('text', 'remark')]}>本服务由信通宝提供支持</Text>
                    </View>

                    <Widget.Modal ref="modal">

                      <View style={[Style.mix('center'), {height: 50}]}>
                        <Text style={Style.text}>还需支付</Text>
                        <Text style={[Style.text, {paddingTop:5}]}>￥{this.state.amount}</Text>
                      </View>

                      <Widget.Password ref="password"
                        onChange={this.onInputPassword}/>

                      <View style={[Style.mix('center', 'row', 'flexRow'), {height: 50}]}>
                        <Text style={Style.text} ref="txtPayCard">{this.state.showText}</Text>
                        <Widget.Link text="更换&gt;" onPress={this.onChangePayCard} />
                      </View>

                      { this.state.remark && (
                          <View style={[Style.mix('center')]}>
                            <Text style={[Style.mix('text', 'remark')]} >{this.state.remark}</Text>
                          </View>
                      )}

                    </Widget.Modal>
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
module.exports = PayPage;
