'use strict';

import React, { Component } from 'react';

import RN, {
    StyleSheet,
    View,
    Text, Alert, AlertIOS,
} from 'react-native';

import alert from '../api/alert.js';
import ajax from '../api/ajax.js';
import config from '../../config.js';

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
import NavMinin from '../core/nav-mixin.js';

import Widget, {
  Style,
  SelectButton,
  Button,
  Form
} from '../widget/widget.js'

var layout = React.createClass({

    mixins: [NavMinin],
    
    submit: function () {

        var self = this, {amount, qrcode, timestamp} = this.props;

        if(!amount || isNaN(amount)){
            return alert('订单金额错误');
        }

        ajax.get({
            url: config.host + '/api/openapi/bscOrder',
            data: {
                amount: (+amount) * 100,
                qrAuthCode: qrcode,
                timestamp: timestamp
            }
        }).then(function (json) {

            var data = json.data || {};

            if (json.code != 0 || !data.outTradeNo) {
                return alert(json.message || '生成订单失败');
            };
            
            self.push({
                title: '订单状态',
                component: require('./order-status.js'),
                passProps: {
                    "amount": amount,
                    "outTradeNo": data.outTradeNo,
                }
            });

        }).catch(function (err) {
            alert(err);
        });
    },

    getInitialState: function () {
        var self = this;

        return {
            loading: false,
            name: '',
            amount: '20',
            form: {
                'merchant': {
                    label: '商户',
                    type: 'Text',
                    props: {
                        value: '测试商户',
                    }
                },
                'amount': {
                    label: '订单金额',
                    type: 'Text',
                    props: {
                        value: this.props.amount,
                    }
                },
            }
        };
    },

    render: function () {
        
        return (
            <View style={Style.mix('page', 'flex')}>
                <RN.ScrollView>
                    <View>
                        <Form ref="form" children={this.state.form} ref="form" />
                        <Button text="下一步" disabled={this.state.loading} ref="btnNext" onPress={this.submit} />
                    </View>
                </RN.ScrollView>
            </View>
        );
    }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;