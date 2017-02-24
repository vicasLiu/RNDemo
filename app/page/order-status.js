'use strict';

import React, { Component } from 'react';

import RN, {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import Style from '../widget/style/style';
import alert from '../api/alert.js';
import ajax from '../api/ajax.js';
import config from '../../config.js';

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
import NavMinin from '../core/nav-mixin.js';

import Widget, {
  Button
} from '../widget/widget.js'

var layout = React.createClass({

    mixins: [NavMinin],
    
    submit: function () {
        
        // var {amount, qrcode} = this.props;
        
        // ajax.get({
        //   url: config.host + '/api/openapi/bscOrder', 
        //   data: { 
        //     amount:amount,
        //     qrAuthCode: qrcode
        //   }
        // }).then(function (json) {
          
        //     var data = json.data || {};

        //   if(json.code != 0 || !data.outTradeNo){
        //     return alert(json.message || '生成订单失败');
        //   };

        //   alert(json.message || '生成订单成功', function(){

        //     self.push({
        //         title: '订单状态',
        //         component: require('./order-status.js'), 
        //         passProps: {
        //             qrcode: qrcode,
        //             amount: amount,
        //             outTradeNo: outTradeNo
        //         }
        //     });
        //   });

        // }).catch(function (err) {
        //   alert(err);
        // });
    },

    refresh: function(){
        var self = this, refresh = function(){
            self.refresh();
        };

        if(self.unmount) return;

        ajax.get({
            url: config.host + '/api/openapi/getOrderStatus',
            data: {
                outTradeNo: this.props.outTradeNo
            }
        }).then(function (json) {

            var data = json.data;

            if(self.unmount) return;

            if(json.message === '交易订单不存在'){
                return setTimeout(refresh, 1000);
            };

            if(json.code != 0 || !data){
                return alert(json.message || '查询订单状态失败');
            };
            
            self.setState({
                "tradeNo": data.tradeNo,
                "tradeStatus": data.tradeStatus,
                "tradeDesc": data.tradeDesc
            });

            if(data.tradeStatus == 3){

            }else{
                setTimeout(refresh, 1000);
            };
            
        }).catch(function(error){
            setTimeout(refresh, 1000);
        });
    },

    finish: function(){
        this.popToTop();
    },

    getInitialState: function () {
        var self = this;
        
        return {
            merchant: this.props.merchant || '测试商户',
            amount: this.props.amount,
            outTradeNo: this.props.outTradeNo,
            tradeNo: '',
            tradeDesc: '',
        };
    },

    componentWillUnmount: function(){
        this.unmount = true;
    },

    render: function () {

        setTimeout(function(){
            this.refresh();
        }.bind(this), 1000);
        
        return (
            <View style={Style.mix('page', 'flex')}>
                <RN.ScrollView>
                    <View>
                        <View>
                            <View style={[ Style.mix('row'), Style.borderBottom, styles.row, styles.firstRow ]}>
                                <Text style={[ styles.label ]}>商户名称</Text>
                                <Text style={[ styles.input ]}>{ this.state.merchant }</Text>
                            </View>
                            <View style={[ Style.mix('row'), Style.borderBottom, styles.row ]}>
                                <Text style={[ styles.label ]}>订单金额</Text>
                                <Text style={[ styles.input ]}>{ this.state.amount } 元</Text>
                            </View>
                            <View style={[ Style.mix('row'), Style.borderBottom, styles.row ]}>
                                <Text style={[ styles.label ]}>外部订单号</Text>
                                <Text style={[ styles.input ]}>{ this.state.outTradeNo }</Text>
                            </View>
                            <View style={[ Style.mix('row'), Style.borderBottom, styles.row ]}>
                                <Text style={[ styles.label ]}>订单状态</Text>
                                <Text style={[ styles.input ]}>{ this.state.tradeDesc }</Text>
                            </View>
                        </View>
                        <Button text="完成" ref="btnNext" onPress={this.finish} />
                    </View>
                </RN.ScrollView>
            </View>
        );
    }
});

// styles
var styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    firstRow: {
        borderTopWidth: 0
    },
    label: {
        width: 100,
        textAlign: 'left',
        color: '#484848',
        fontSize: Style.fontSize
    },
    input: {
        flex: 3,
        fontSize: Style.fontSize,
        textAlign: 'left'
    },
    text: {
        color: '#484848',
    },
    textInput: {
        color: '#ababab',
        height: Style.fontSize + 2
    }
});

module.exports = layout;