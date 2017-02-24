import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import Style from './style';

var styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: Style.fontSize,
        margin: 5,
        paddingLeft: 5,
        color: '#FFF',
    }
});

class Input extends Component {
    
    focus(){
        this.refs.input.focus();
    }
    
    blur(){
        this.refs.input.blur();
    }

    render(){
        
        return (
            <TextInput style={[styles.container, this.props.style]}
                selectionColor="#DDD"
                placeholderTextColor="#CCC"
                autoCapitalize="none"
                ref="input"
                {...this.props}>
            </TextInput>
        );
    }

}

export default Input;