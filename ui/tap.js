import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class Button extends Component {
    
    render(){
        var disabled = this.props.disabled;

        return (
            <TouchableOpacity
                activeOpacity={ disabled ? 0.99 : 0.8}
                style={[
                    styles.container, 
                    this.props.style
                ]}
                {...this.props}>

                    {this.props.text || this.props.children}

            </TouchableOpacity>
        );
    }

}

export default Button;