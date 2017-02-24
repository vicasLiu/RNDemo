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

var labelStyle = {
    width: 50,
};

class BSC extends Page{
    
    static navigatorButtons = {
        rightButtons: [{
            title: '关闭',
            id: 'dismissModal'
        }]
    }

    constructor(props){
        super(props);

        this.state = {
            username: '13800000001',
            password: '147258',
            user: null
        };
        
        this.refresh();
    }

    refresh(){

        // 读取用户信息
        this.userinfo().then((data) => {
            this.setState({
                user: data
            });
            this.setTitle({
                title: '已登录'
            });
        }).catch((err)=>{
            this.setTitle({
                title: '未登录'
            });
        });
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
        return this.state.username && this.state.password;
    }
    
    // 登录
    login() {

        this.setState({
            loading: true
        });
        
        this.get({
            url: '/api/user/login',
            data: {
                loginName: this.state.username,
                password: this.state.password
            }
        }).then((json) => {
            
            this.userinfo(Object.assign({loginName: this.state.username}, json.data));

            this.refresh();
        
            this.setState({
                loading: false
            });

            this.setTitle({
                title: '已登录'
            });

        }).catch((err) => { 
            this.alert(err); 
        
            this.setState({
                loading: false
            });

            this.setTitle({
                title: '未登录'
            });
        });
    }
    
    logout(){
        // storage.remove({
        //     key: 'user'
        // });
        this.userinfo(null);
        this.setState({
            user: null
        });
        this.setTitle({
            title: '未登录'
        });
    }
    
    render(){

        var logo, form;

        logo = (
            <View style={[Style.center, { paddingTop: 30, paddingBottom: 30 }]}>
                <Icon name="login" retina={true}></Icon>
                <Text style={{ paddingTop: 10, color: '#FFF'}}>商户客户端</Text>
            </View>
        );

        if(!this.state.user){
            form = (
                <View>
                    <View style={[Style.center, { paddingTop: 30, paddingBottom: 30 }]}>
                        <Icon name="login" retina={true}></Icon>
                        <Text style={{ paddingTop: 10, color: '#FFF'}}>商户客户端</Text>
                    </View>
                    <Form>
                        <Field labelIcon="user" labelStyle={labelStyle} isHead={true}>
                            <Input placeholder="请输入用户名" defaultValue={this.state.username} 
                                keyboardType="default"
                                clearButtonMode="always"
                                onChangeText={this.stateChanger('username')}></Input>
                        </Field>
                        <Field labelIcon="pwd" labelStyle={labelStyle}>
                            <Password placeholder="请输入密码" defaultValue={this.state.password}
                                type="password"
                                keyboardType="default"
                                returnKeyType="done"
                                clearButtonMode="always"
                                onSubmitEditing={this.login.bind(this)}
                                onChangeText={this.stateChanger('password')}></Password>
                        </Field>
                    </Form>
                    <Button 
                        style={{ marginTop: 20 }}
                        loading={this.state.loading}
                        disabled={!this.isValid()} onPress={this.login.bind(this)}>登录</Button>
                </View>
            );
        }else if(this.state.user){
            form = (
                <View>
                    <View style={[Style.center, { paddingTop: 30, paddingBottom: 30 }]}>
                        <Icon name="login" retina={true}></Icon>
                        <Text style={{ paddingTop: 10, color: '#FFF'}}>{this.state.user.name} 已登录</Text>
                    </View>
                    <Button 
                        style={{ marginTop: 20 }}
                        onPress={this.logout.bind(this)}>登出</Button>
                </View>
            );
        };

        return (
            <View style={[Style.mix('page', 'pt20'), { paddingLeft: 20, paddingRight: 20 }]}>
                <ScrollView>
                    {form}
                </ScrollView>
            </View>
        );
    }
}

module.exports = BSC;