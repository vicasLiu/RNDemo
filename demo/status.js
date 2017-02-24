import React, { Component } from 'react'
import { 
    StyleSheet, 
    AppRegistry, 
    View,
    Text,
    TextInput,
    ScrollView
} from 'react-native'

import Page from '../lib/page.js'
import config from '../config.js'
import Style from '../ui/style.js'
import Button from '../ui/button.js'
import Form from '../ui/form.js'
import Field from '../ui/field.js'
import Input from '../ui/input.js'
import Password from '../ui/password.js'
import Icon from '../ui/icon.js'
import Tap from '../ui/tap.js'
import storage from '../lib/storage.js'

var labelStyle = {
    width: 100,
    borderRightWidth: 0,
};

var labelTextStyle = {
    textAlign: 'right',
    color: '#666',
    fontSize: 12,
};

var fieldStyle = {
    borderWidth: 0,
    borderTopWidth: 0,
};

var fieldTextStyle = {
    color: '#666',
    fontSize: 12,
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e9ec'
    }
});

module.exports = class extends Page{
    
    static navigatorButtons = {
        rightButtons: [{
            title: '关闭',
            id: 'dismissModal'
        }]
    }
    
    constructor(props){
        super(props);

        this.state = {
            data: null,
            outTradeNo: props.outTradeNo,
            amount: props.amount || 200,
            open: false,
            error: '',
        }

        this.userinfo().then( user => {
            this.loginName = user.loginName;
        
            setTimeout(() => {
                this.refresh();
            }, 1000);
        });
    }

    // 提交
    refresh(){
        
        if(this.unmount) return;

        this.get({
            url: '/api/openapi/orderStatus',
            data: {
                outTradeNo: this.state.outTradeNo,
                loginName: this.loginName,
            },
            checkCode: false
        }).then((json) => {
            
            var {data, message} = json;

            if(this.unmount) return;

            if(!data){
                this.setState({
                    error: (message || '没有数据') + '，订单可能不存在'
                });
                return;
            };

            // 因为更新状态可能会有延时，所以
            // 如果从确认页面带过来了tradeStatus而且状态是成功的话，就显示带过来的状态
            if(data.tradeStatus < 3 && this.props.tradeStatus >= 3){
                data.tradeStatus = this.props.tradeStatus;
            };
            
            this.setState({
                data: data,
                json: json
            });
            
            if(message === '交易订单不存在' || data.tradeStatus < 3){
                return setTimeout(() => {
                    this.refresh();
                }, 1000);
            };
            
        }).catch((error) => {
            if(error === '交易订单不存在'){
                setTimeout(this.refresh.bind(this), 1000);
            }else{
                this.setState({
                    error: error
                });
            };
        });
    }

    open(){
        this.setState({
            open: true
        });
    }

    close(){
        this.setState({
            open: false
        });
    }

    render(){

        var { tradeStatus, outTradeNo, tradeNo } = this.state.data || {},
            status = {
                '1': {
                    icon: 'info',
                    text: '等待用户支付',
                },
                '2': {
                    icon: 'info',
                    text: '交易进行中',
                },
                '3': {
                    icon: 'success',
                    text: '支付成功',
                },
                '4': {
                    icon: 'failure',
                    text: '交易失败',
                },
                '5': {
                    icon: 'failure',
                    text: '交易已关闭',
                },
            }[tradeStatus] || null,
            detail,
            content;

        if(!this.state.open){
            detail = (
                <View style={[Style.center, { marginTop: 20}]}>
                    <Tap style={[Style.center, { width: 160, height: 80 }]} onPress={this.open.bind(this)}>
                        <Text style={[Style.remark, {marginBottom: 10}]}>展开订单详情</Text>
                        <Icon name="arrowdown" retina={true}></Icon>
                    </Tap>
                </View>
            );
        }else{
            detail = (
                <View style={[Style.center, { marginTop: 20}]}>
                    <Form style={[Style.center, { borderWidth: 0 }]}>
                        <Field label="订单号：" style={fieldStyle} labelTextStyle={labelTextStyle} labelStyle={labelStyle} isHead={true}>
                            <Text style={fieldTextStyle}>{tradeNo}</Text>
                        </Field>
                        <Field label="外部订单号：" style={fieldStyle} labelTextStyle={labelTextStyle} labelStyle={labelStyle}>
                            <Text style={fieldTextStyle}>{outTradeNo}</Text>
                        </Field>
                    </Form>
                    <View style={[Style.center]}>
                        <Tap style={[Style.center, { width: 160, height: 80 }]} onPress={this.close.bind(this)}>
                            <Icon name="arrowup" retina={true}></Icon>
                            <Text style={[Style.remark, {marginTop: 10}]}>收起订单详情</Text>
                        </Tap>
                    </View>
                </View>
            );
        };

        if(this.state.error){
            content = (
                <View style={[Style.center, { marginTop: 30 }]}>
                    <Text style={[Style.remark]}>{this.state.error}</Text>
                </View>
            );
        }else if(!status){
            content = (
                <View style={[Style.center, { marginTop: 30 }]}>
                    <Text style={[Style.remark]}>正在查询订单信息，请稍后</Text>
                </View>
            );
        }else{
            let amountView = 
                typeof this.state.amount === 'undefined' ? 
                    null : (
                        <View style={[Style.center, { marginTop: 30}]}>
                            <Text>支付金额 ￥{this.state.amount}</Text>
                        </View>
                    );
            content = (
                <View>
                    <View style={{backgroundColor: '#FFF'}}>
                        <View>
                            <View style={[Style.center, { marginTop: 30, flexDirection: 'row' }]}>
                                <Icon name={status.icon} retina={true}></Icon>
                                <Text style={[Style.title, { marginLeft: 10 }]}>{status.text}</Text>
                            </View>
                            {amountView}
                        </View>
                        {detail}
                        <View style={{marginTop: 30}}>
                            <Icon name="fence"></Icon>
                        </View>
                    </View>
                    <Button theme="blue" loading={tradeStatus == '1' || tradeStatus == '2'} onPress={this.dismissModal.bind(this)}>完成</Button>
                </View>
            );
        }
        
        return (
            <View style={styles.container}>
                <ScrollView>
                    {content}
                </ScrollView>
            </View>
        );
    }
}