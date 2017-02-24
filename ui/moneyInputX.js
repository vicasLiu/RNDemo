import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from 'react-native';
import Style from './style';

var styles = StyleSheet.create({
    container: {
        padding: 20,
        height: 120
    },
    label: {
        color: '#999',
        fontSize: 12,
        height: 25,
        paddingLeft: 3
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    prefix: {
        width: 30,
        fontSize: 30,
        color: '#033563',
        paddingTop: 8
    },
    input: {
        fontSize: 50,
        color: '#033563',
        flex: 1,
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
            <View style={[styles.container, this.props.style]}>
                <Text style={styles.label}>输入金额（元）</Text>
                <View style={styles.row}>
                    <Text style={styles.prefix}>￥</Text>
                    <TextInput
                        ref="input"
                        selectionColor="#033563"
                        placeholderTextColor="#CCC"
                        {...this.props}
                        style={[styles.input, this.props.inputStyle]}>
                    </TextInput>
                </View>
            </View>
        );
    }

}

export default Input;