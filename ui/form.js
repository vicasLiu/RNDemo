import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Style from './style';

var styles = StyleSheet.create({
    container: {
        borderWidth: Style.realpixel,
        margin: 10,
        borderColor: '#DDD',
        borderRadius: 3,
    }
});

class Form extends Component {
    
    render(){
        
        return (
            <View style={[styles.container, this.props.style]}>
                {this.props.children}
            </View>
        );
    }

}

export default Form;