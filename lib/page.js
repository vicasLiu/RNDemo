import React, { Component } from 'react';
import {
    StyleSheet,
    AppRegistry,
    View,
    Text,
    ScrollView
} from 'react-native';
//import Toast from 'react-native-root-toast';

import config from '../config.js';
import ajax from './ajax.js';
import alert from './alert.js';
import storage from './storage.js';
import Style from '../ui/style.js';

class Page extends Component {

    static navigatorStyle = Style.navigatorStyle

    constructor(props){
        super(props);
        
        // 绑定导航事件
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
        
        // 检查登录
        if(this.constructor.needLogin){
            
            this.userinfo().then((data) => {
                if(!data){
                    this.toIndex().toLogin();
                };
            }).catch(() => {
                this.toIndex().toLogin();
            });
        };
    }

    componentWillUnmount (){
        this.unmount = true;
    }

    get(opt) {
        
        return new Promise((resolve, reject) => {

            this.setting().then((data) => {
                if(data.env){
                    opt.host = data.env || 'test';
                };
                ajax.get(opt).then(resolve, reject);
            }).catch(() => {
                opt.host = 'test';
                ajax.get(opt).then(resolve, reject);
            });
        });

    }

    alert() {
        if(this.unmount) return this;
        
        alert.apply(null, arguments);

        //this.toast.apply(this, arguments);

        return this;
    }

    // toast(msg, opt){

    //     if(typeof opt === 'function'){
    //         opt = {
    //             onHidden: opt
    //         };
    //     };

    //     let toast = Toast.show(msg + '', Object.assign({
    //         duration: Toast.durations.LONG,
    //         position: Toast.positions.BOTTOM,
    //         shadow: true,
    //         animation: true,
    //         hideOnPress: true,
    //         delay: 0,
    //         onShow: () => {
    //             // calls on toast\`s appear animation start
    //         },
    //         onShown: () => {
    //             // calls on toast\`s appear animation end.
    //         },
    //         onHide: () => {
    //             // calls on toast\`s hide animation start.
    //         },
    //         onHidden: () => {
    //             // calls on toast\`s hide animation end.
    //         },
    //     }, opt));

    //     return toast;
    // }

    // ======================
    save(key, value, expiresSecond) {
        storage.save({
            key: key,
            rawData: value,
            expires: 1000 * (expiresSecond || 0)
        });
        return this;
    }

    read(key) {
        return storage.load({
            key: key,
        });
    }

    // 读取或写入用户信息
    userinfo(){
        if(arguments.length > 0){
            // 登录信息保存一个月
            return this.save('user', arguments[0], 3600*30);
        }else{
            return this.read('user');
        }
    }

    // 读取或保存设置
    setting(){
        if(arguments.length > 0){
            // 设置信息保存一年
            return this.save('setting', arguments[0], 3600*365);
        }else{
            return this.read('setting');
        }
    }

    // ======================
    // 导航方法
    // ======================

    _navigatorMethod(name, args) {

        // // 防止误触发
        // if(this.naving){
        //     return;
        // }else{
        //     this.naving = true;
        //     setTimeout(() => {
        //         this.naving = false;
        //     }, 100);
        // };
        
        var nav = this.props.navigator;
        if (nav && (typeof nav[name] === 'function')) {
            return nav[name].apply(nav, args);
        }
    }

    push() {
        this._navigatorMethod('push', arguments);
        return this;
    }

    pop() {
        this._navigatorMethod('pop', arguments);
        return this;
    }

    popToRoot() {
        this._navigatorMethod('popToRoot', arguments);
        return this;
    }

    resetTo() {
        this._navigatorMethod('resetTo', arguments);
        return this;
    }

    showModal(){
        this._navigatorMethod('showModal', arguments);
        return this;
    }

    dismissModal(){
        this._navigatorMethod('dismissModal', arguments);
        return this;
    }

    dismissAllModals(){
        this._navigatorMethod('dismissAllModals', arguments);
        return this;
    }

    setButtons(){
        this._navigatorMethod('setButtons', arguments);
        return this;
    }

    setTitle(){
        this._navigatorMethod('setTitle', arguments);
        return this;
    }
    
    onNavigatorEvent(e){
        
        if(e.type === 'NavBarButtonPress'){

            let [,method,screen,title] = e.id.match(/^(push|showModal|resetTo):(\w+),(.+)/) || [];
            
            // 如果 e.id 格式如： resetTo:index,首页
            // 则执行 this.resetTo({ screen: 'index', title: '首页' })；
            if(method && this[method]){
                this[method]({
                    screen: screen,
                    title: title,
                });
                return;
            };

            switch(e.id){
                case 'index':
                    this.toIndex();
                    return;
                case 'login':
                    return this.toLogin();
                case 'orders':
                    return this.toOrders();
                case 'setting':
                    return this.toSetting();
                case 'dismissModal':
                    this.dismissModal();
                    return;
                case 'dismissAllModals':
                    this.dismissAllModals();
                    return;
            }
        }
    }

    toIndex(opt){
        this['resetTo'](Object.assign({
            title: '商户客户端',
            screen: 'index'
        }, opt));
        return this;
    }

    toLogin(){
        this['showModal']({
            title: '登录',
            screen: 'login'
        });
        return this;
    }

    toSetting(){
        this['showModal']({
            title: '设置',
            screen: 'setting'
        });
        return this;
    }

    toOrders(method){
        this['showModal']({
            title: '订单列表',
            screen: 'orders',
        });
        return this;
    }

}

module.exports = Page;