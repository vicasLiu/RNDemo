import React, { Component } from 'react';
import { 
    StyleSheet, 
    AppRegistry, 
    View,
    Text,
    ScrollView
} from 'react-native';

import Page from '../lib/page.js';
import Style from '../ui/style.js';
import Icon from '../ui/icon.js';
import storage from '../lib/storage.js';
import Tap from '../ui/tap.js';

var styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
    },
    tap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20, 
        paddingBottom: 20,
        borderWidth: Style.realpixel,
        borderColor: '#236cdb',
        margin: 20,
        paddingLeft: 40,
        paddingRight: 40,
        borderRadius: 5
    },
    text: {
        marginTop: 5,
        color: '#FFF',
        fontSize: Style.fontSize * 1.2
    }
});

class BSC extends Page{
    
    static navigatorButtons = {
        leftButtons: [{
            title: '设置',
            id: 'setting'
        }],
        rightButtons: [
            {
                title: '商户',
                id: 'login'
            },
            // {
            //     title: '调试',
            //     id: 'showModal:orders,订单列表'
            // }, 
        ]
    }
    
    constructor(props){
        super(props);
    }

    toScan(){
        this.showModal({
            title: '收款',
            screen: 'input'
        });
    }

    render(){
        return (
            <View style={[Style.mix('page', 'center'), styles.container]}>
                <Tap style={styles.tap} onPress={this.toScan.bind(this)}>
                    <Icon name="scan" retina={true}></Icon>
                    <Text style={styles.text}>扫码收款</Text>
                </Tap> 
                <Tap style={[styles.tap, { marginTop: 0 }]} onPress={() => { this.toOrders('push'); }}>
                    <Icon name="orders" retina={true}></Icon>
                    <Text style={styles.text}>订单查询</Text>
                </Tap>
            </View>
        );
    }
}

module.exports = BSC;