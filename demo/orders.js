import React, { Component } from 'react'
import { 
    StyleSheet, 
    AppRegistry, 
    View,
    Text,
    ScrollView,
    RefreshControl,
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
    width: 100,
    textAlign: 'right',
    paddingRight: 10
};

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    content: {
        width: 360,
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    },
    list: {
        backgroundColor: '#FFF',
        width: 338,
        paddingTop: 15,
    },
    item: {
        borderBottomWidth: Style.realpixel,
        borderBottomColor: '#DDD',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        marginBottom: 20,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    orderNo: {
        flex: 1,
        color: '#033563',
        fontSize: 13,
    },
    orderAmount: {
        color: '#033563',
        fontSize: 18,
        paddingLeft: 10,
    },
    bottomRow: {
        flexDirection: 'row',
        marginTop: 10,
    },
    orderTime: {
        flex: 1,
        color: '#999',
        fontSize: 12,
    },
    orderStatus: {
        color: '#F60',
        fontSize: 12,
    },
    textSuccess: {
        color: 'green',
    },
    textFailure: {
        color: 'red',
    },
    noOrder: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 20,
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
            data: [],
            error: '',
            loading: true,
        }

        this.userinfo().then( user => {
            this.loginName = user.loginName;

            this.refresh();

        });
        
    }

    // 提交
    refresh(){
        
        if(this.unmount) return;

        this.setState({
            loading: true,
        });

        this.get({
            url: '/api/order/orderHisList',
            data: {
                loginName: this.loginName,
                size: 999,
                page: 1,
            },
        }).then((json) => {
        
            if(this.unmount) return;
            
            var { data: { list: data } } = json;
            
            this.setState({
                data: data || [],
                loading: false,
            });
            
        }).catch((error) => {
            this.setState({
                error: error,
                loading: false,
            });
        });
    }
    
    render(){
        
        var elements = (this.state.data || []).map(function(n, i){
            var amount = n.orderAmount / 100;
            var textStatus = {
                '1': null,
                '2': null,
                '3': styles.textSuccess,
                '4': styles.textFailure,
                '5': styles.textFailure,
            }[n.status];

            return (
                <View key={i} style={[styles.item]}>
                    <View style={styles.topRow}>
                        <Text style={styles.orderNo}>{n.orderNo}</Text>
                        <Text style={styles.orderAmount}>￥{amount}</Text>
                    </View>
                    <View style={styles.bottomRow}>
                        <Text style={styles.orderTime}>{n.createTime}</Text>
                        <Text style={[styles.orderStatus, textStatus]}>{n.statusDesc}</Text>
                    </View>
                </View>
            );
        });

        var content = this.state.loading ? (
            <View style={[styles.content]}>
                <Icon name="loading" autoSize={true}></Icon>
            </View>
        ) : elements.length ? (
            <View style={[styles.content]}>
                <Icon name="order_header" autoSize={true}></Icon>
                <ScrollView style={{backgroundColor: '#FFF'}}
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.loading}
                            onRefresh={this.refresh.bind(this)}
                        />
                    }
                    >
                    <View style={[styles.list]}>
                        {elements}
                    </View>
                </ScrollView>
                <Icon name="order_footer" autoSize={true}></Icon>
            </View>
        ) : (
            <View style={[Style.mix('flex', 'center'), styles.content]}>
                <Icon name="no_order" autoSize={true}></Icon>
                <Text style={styles.noOrder}>暂时没有订单</Text>
            </View>
        );

        return (
            <View style={[Style.mix('page'), styles.container]}>
                {content}
            </View>
        );
    }
}