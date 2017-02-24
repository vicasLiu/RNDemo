import React, { Component } from 'react'
import { 
    StyleSheet, 
    AppRegistry, 
    View,
    Text,
    ScrollView,
    Switch
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
    width: 100,
    borderRightWidth: 0,
};
var labelTextStyle = {
    textAlign: 'center',
    color: '#666'
};
var slotStyle = {
    flexDirection: 'row',
    justifyContent: 'flex-end',
};
var switchStyle = {
    margin: 10
};
var pStyle = {
    margin: 10,
    color: '#666'
}

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
            env: 'test'
        };
        
        // 读取设置
        this.setting().then((data) => {
            this.setState({
                env: data.env || 'test'
            });
        }).catch((err)=>{
            this.setState({
                env: 'test'
            });
        });
    }
    
    // 修改state
    setEnv (value){
        return () => {
            this.setState({
                env: value
            }); 
            // 保存设置
            this.setting({
                env: value.toLowerCase()
            });
        };
    }
    
    render(){

        var envs = {
            hapjs: '开发',
            test: '测试',
            uat: '联调',
            //gray: '灰度',
            perf: '演练',
        }, fields = [], index = 0;

        Object.keys(envs).forEach((key) => {
            let title = envs[key] + '：';
            fields.push((
                <Field key={key} label={title} 
                    slotStyle={slotStyle} labelTextStyle={[labelTextStyle]} labelStyle={[labelStyle]} isHead={index === 0}>
                    <Switch
                        onValueChange={this.setEnv(key).bind(this)}
                        style={switchStyle}
                        value={this.state.env == key} />
                </Field>
            ));
            index++;
        });
        
        return (
            <View style={[Style.mix('pageGray', 'pt20')]}>
                <ScrollView>
                    <View>
                        <Text style={pStyle}>选择运行环境：</Text>
                        <Form style={Style.pageGrayForm}>
                            {fields}
                        </Form>
                        <Button 
                            style={{ marginTop: 10 }}
                            theme="warn"
                            onPress={this.dismissModal.bind(this)}>关闭</Button>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

module.exports = BSC;