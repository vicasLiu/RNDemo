import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Style from './style';
import Icon from '../ui/icon.js';

var styles = {
    defaults: StyleSheet.create({
        container: {
            flexDirection: 'row',
            borderTopWidth: Style.realpixel,
            borderTopColor: '#DDD',
            height: 50,
            alignItems: 'stretch',
        },
        label: {
            width: 100,
            borderRightWidth: Style.realpixel,
            borderRightColor: '#DDD',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        labelText: {
            textAlign: 'center',
            color: '#FFF',
            fontSize: Style.fontSize * 1.1,
            flex: 1
        },
        slot: {
            flex: 1,
            paddingLeft: 10,
            flexDirection: 'row',
            alignItems: 'center',
        }
    }),
};

class Form extends Component {

    render(){
    
        var label, style = styles[this.props.type || 'defaults'];

        if(this.props.label){
            label = (
                <View style={[style.label, { width: this.props.labelWidth }, this.props.labelStyle]}>
                    <Text style={[style.labelText, this.props.labelTextStyle]}>
                        {this.props.label}
                    </Text>
                </View>
            );
        };

        if(this.props.labelIcon){
            label = (
                <View style={[style.label, { width: this.props.labelWidth }, this.props.labelStyle]}>
                    <Icon name={this.props.labelIcon}></Icon>
                </View>
            );
        };
        
        return (
            <View style={[
                style.container, 
                this.props.isHead ? { borderTopWidth: 0 } : {}, 
                this.props.style,
            ]}>
                {label}
                <View style={[style.slot, this.props.slotStyle]}>
                    {this.props.children}
                </View>
            </View>
        );
    }

}

export default Form;