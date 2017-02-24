import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Style from './style.js';
import Icon from './icon.js';

var styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
        margin: 10
    },
    text: {
        fontSize: Style.fontSize
    }
});

var themes = {
    defaults: {
        // 按钮的颜色
        buttonBackgroundColor: '#FFF',
        buttonTextColor: '#73a5d8',
        // 不可用的按钮的颜色
        buttonDisabledBackgroundColor: '#DDD',
        buttonDisabledTextColor: '#999',
    },
    blue: {
        // 按钮的颜色
        buttonBackgroundColor: '#387ee8',
        buttonTextColor: '#FFF',
        // 不可用的按钮的颜色
        buttonDisabledBackgroundColor: '#DDD',
        buttonDisabledTextColor: '#999',
    },
    warn: {
        // 按钮的颜色
        buttonBackgroundColor: '#E84F1E',
        buttonTextColor: '#FFF',
        // 不可用的按钮的颜色
        buttonDisabledBackgroundColor: '#DDD',
        buttonDisabledTextColor: '#999',
    },
}

class Button extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            clicked: 0
        };
    }

    onPress(){

        this.setState({
            clicked: this.state.clicked + 1
        });

        if(typeof this.props.onPress === 'function'){
            this.props.onPress();
        };
    }
    
    render(){
        var disabled = this.props.disabled || (this.props.once && this.state.clicked > 0);
        var loading = this.props.loading;

        var text, theme = themes[this.props.theme] || themes.defaults;

        if(loading){
            text = (
                <Icon name="loading"></Icon>
            );
        }else{
            text = (
                <Text style={[styles.text, {
                    color: disabled ? 
                        theme.buttonDisabledTextColor : 
                        theme.buttonTextColor
                    }, this.props.textStyle]} ref="text">
                        {this.props.text || this.props.children}
                </Text>
            );
        }

        return (
            <TouchableOpacity
                onPress={
                    (disabled || loading) ? null : this.onPress.bind(this)
                }
                activeOpacity={ (disabled || loading) ? 0.99 : 0.8}
                style={[
                    styles.container, 
                    { backgroundColor: (disabled || loading) ? 
                        theme.buttonDisabledBackgroundColor : 
                        theme.buttonBackgroundColor
                    }, 
                    this.props.style
                ]}>

                {text}

            </TouchableOpacity>
        );
    }

}

export default Button;