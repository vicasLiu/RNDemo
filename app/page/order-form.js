'use strict';

import React, { Component } from 'react';

import RN, {
    StyleSheet,
    View,
    Text, Alert, AlertIOS,
} from 'react-native';

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
import NavMinin from '../core/nav-mixin.js';

import Widget, {
  Style,
  SelectButton,
  Button,
  alert,
  Form
} from '../widget/widget.js'

var layout = React.createClass({

    mixins: [NavMinin],

    // 跳转到
    go: function(name){
        return function(){
        this.push(name);
        }.bind(this);
    },

    submit: function () {
        if(this.state.price > 0){
            this.push({
                title: '扫码',
                component: require('./order-scan.js'),
                passProps: {
                    amount: this.state.price
                }
            });
        }else{
            return Alert.alert('订单金额错误');
        };
    },

    getInitialState: function () {
        var self = this;

        return {
            name: '',
            price: '20',
            form: {
                
                'price': {
                    label: '金额',
                    type: 'TextInput',
                    props: {
                        maxLength: 8,
                        placeholder: '请输入订单金额',
                        value: '20',
                        onChangeText: function (text) {
                            self.setState({
                                price: text
                            });
                        }
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
                        <Button text="下一步" ref="btnNext" onPress={this.submit} />
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