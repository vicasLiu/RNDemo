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
import MoneyInput from '../ui/moneyInputX.js'
import Password from '../ui/password.js'
import Icon from '../ui/icon.js'
import storage from '../lib/storage.js'

var labelStyle = {
    width: 100,
    textAlign: 'right',
    paddingRight: 10
};

var styles = StyleSheet.create({
    container: {

    }
});

module.exports = class extends Page{
    
    static navigatorButtons = {
        rightButtons: [{
            title: '关闭',
            id: 'dismissModal'
        }]
    }

    // 需要登录
    static needLogin = true

    constructor(props){
        super(props);

        this.state = {
            amount: '',
        };

        setTimeout(() => {
            this.refs.input.focus();
        }, 500);
        
    }
    
    // 修改state
    stateChanger (name){
        return (text) => { 
            let state = {}; 
            state[name] = text; 
            this.setState(state); 
        };
    }

    // 检查表单
    isValid(){
        var amount = this.state.amount;
        return amount && !isNaN(amount) && (+amount > 0);
    }

    next(){

        if(!this.isValid()) return;
        
        this.showModal({
            title: '扫码',
            screen: 'scan',
            passProps: {
                amount: this.state.amount
            },
        });
    }

    render(){

        return (
            <View style={[Style.mix('pageGray'), styles.container]}>
                <View>
                    <Form style={[Style.mix('pageGrayForm')]}>
                        <MoneyInput defaultValue={this.state.amount} 
                            keyboardType="numeric"
                            clearButtonMode="always"
                            ref="input"
                            maxLength={6}
                            onChangeText={this.stateChanger('amount')}></MoneyInput>
                    </Form>
                    <Button 
                        theme="blue"
                        style={{ marginTop: 20 }}
                        disabled={!this.isValid()} onPress={this.next.bind(this)}>扫码收款</Button>
                </View>
            </View>
        );
    }
}