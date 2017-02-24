import React, { Component } from 'react'
import { 
    StyleSheet, 
    AppRegistry, 
    View,
    Text,
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
import storage from '../lib/storage.js'

var labelStyle = {
    width: 13*5 + 20,
};

var labelTextStyle = {
    textAlign: 'center',
    fontSize: 13
};

var slotStyle = {
    borderLeftWidth: 0,
}

var styles = StyleSheet.create({
    container: {

    }
});

module.exports = class extends Page{

    static navigatorButtons = {
        rightButtons: [{
            title: '取消',
            id: 'dismissAllModals'
        }]
    }

    constructor(props){
        super(props);
        
        this.state = {
            loading: false,
            error: '',
            timestamp: '',
            json: null,
            amount: (+props.amount) * 100
        };

        // 读取用户信息
        this.userinfo().then((data) => {

            this.loginName = data.loginName;

            this.setState({
                username: data.name
            });

            this.checkPayment();

        }).catch((err)=>{});
    }

    // 检查表单
    isValid(){
        var { qrcode } = this.props;
        var { error, timestamp, amount } = this.state;

        return !error && timestamp && amount && !isNaN(amount) && (+amount > 0) && qrcode;
    }

    // 
    checkPayment() {
        var { qrcode } = this.props;

        this.setState({
            error: '正在校验订单，请稍候'
        });

        // 校验二维码
        this.get({
            url: '/api/openapi/checkPayment',
            data: {
                amount: this.state.amount,
                qrAuthCode: qrcode
            }
        }).then((json) => {

            this.setState({
                json: json
            })
            
            if (!json.data || !json.data.timestamp) {
                this.setState({
                    error: '服务器返回的数据缺少[timestamp]'
                });
                return;
            };

            this.setState({
                error: '',
                timestamp: json.data.timestamp
            });

        }).catch((error) => {
            this.setState({
                error: error
            });
        });
    }

    // 提交
    submit(){

        var { qrcode } = this.props;

        this.setState({
            loading: true
        });

        this.get({
            url: '/api/openapi/bscOrder',
            data: {
                amount: this.state.amount,
                qrAuthCode: qrcode,
                timestamp: this.state.timestamp,
                loginName: this.loginName,
            }
        }).then((json) => {
            
            var { outTradeNo, tradeStatus } = json.data || {};
            
            if (!outTradeNo) {
                this.setState({
                    error: '缺少外部订单号'
                });
                return;
            };
            
            this.showModal({
                title: '订单状态',
                screen: 'status',
                passProps: {
                    amount: this.props.amount,
                    outTradeNo: outTradeNo,
                    tradeStatus: tradeStatus,
                },
            });
            
            this.toIndex();

            this.setState({
                loading: false
            });

        }).catch((err) => {

            this.setState({
                error: err,
                loading: false
            });
        });
    }

    render(){
        
        var message = this.state.error ? (
            <View style={[Style.center, { marginTop: 5 }]}>
                <Text style={{ color: 'red' }}>{this.state.error}</Text>
            </View>
        ) : null;

        var button = !this.isValid() ? null : (
            <Button 
                theme="blue"
                style={{ marginTop: 20 }} loading={this.state.loading}
                disabled={!this.isValid()} onPress={this.submit.bind(this)}>确认收款</Button>
        );

        return (
            <View style={[Style.mix('pageGray'), styles.container]}>
                <View>
                    <Form style={Style.pageGrayForm}>
                        <Field label="商户名称:" 
                            labelTextStyle={[Style.pageGrayLabelText, labelTextStyle]}
                            labelStyle={[labelStyle]} 
                            slotStyle={slotStyle}
                            isHead={true}>
                            <Text style={Style.pageGrayTextStyle}>{this.state.username}</Text>
                        </Field>
                        <Field label="订单金额:" 
                            labelTextStyle={[Style.pageGrayLabelText, labelTextStyle]}
                            labelStyle={[labelStyle]} 
                            slotStyle={slotStyle}
                            >
                            <Text style={Style.pageGrayTextStyle}>{this.props.amount} 元</Text>
                        </Field>
                    </Form>
                    {message}
                    {button}
                </View>
            </View>
        );
    }
}