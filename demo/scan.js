
import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Alert
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
import storage from '../lib/storage.js'
import Camera from 'react-native-camera'

class QRCodeScreen extends Page {

    static navigatorButtons = {
        rightButtons: [{
            title: '取消',
            id: 'dismissModal'
        }]
    }

    _onPressCancel() {
        var self = this;
        requestAnimationFrame(function () {
            self.props.navigator.pop();
            if (self.props.onCancel) {
                self.props.onCancel();
            }
        });
    }

    _onBarCodeRead(result) {

        if (this.watting) {
            this.watting = false;

            Vibration.vibrate();

            this.showModal({
                title: '订单确认',
                screen: 'confirm',
                passProps: {
                    qrcode: result.data,
                    amount: this.props.amount,
                }
            });
        }
    }

    render() {

        var cancelButton = null;

        this.watting = true;

        if (this.props.cancelButtonVisible) {
            cancelButton = <CancelButton onPress={this._onPressCancel.bind(this)} title={this.props.cancelButtonTitle} />;
        }
    
        return (
        <Camera onBarCodeRead={this._onBarCodeRead.bind(this)} captureAudio={false} style={styles.camera}>
            <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}/>
            </View>
            {cancelButton}
        </Camera>
        );
    }
}

var CancelButton = React.createClass({
    render() {
        return (
            <View style={styles.cancelButton}>
                <TouchableOpacity onPress={this.props.onPress}>
                <Text style={styles.cancelButtonText}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    },
});

var styles = StyleSheet.create({

    camera: {
        flex: 1,
        alignItems: 'center',
    },

    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },

    rectangle: {
        height: 250,
        width: 250,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent',
    },

    cancelButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 3,
        padding: 15,
        width: 100,
        bottom: 10,
    },

    cancelButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#0097CE',
    },

});

module.exports = QRCodeScreen;