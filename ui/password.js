import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import Style from './style';
import Input from './input.js';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: Style.fontSize,
        margin: 5,
        paddingLeft: 5,
        color: '#FFF',
    }
});

class Password extends Component {
    
    render(){
        
        return (
            <Input
                secureTextEntry={true}
                {...this.props}>
            </Input>
        );
    }

}

export default Password;