'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Alert
} from 'react-native';

import alert from '../api/alert.js';
import ajax from '../api/ajax.js';

import Camera from 'react-native-camera';
import config from '../../config.js';

// 用于mixin，简化导航方法的调用
// 让页面具有 this.props.navigator 上的方法，如 this.push 等
import NavMinin from '../core/nav-mixin.js';

var QRCodeScreen = React.createClass({

    mixins: [NavMinin],

  propTypes: {
    cancelButtonVisible: React.PropTypes.bool,
    cancelButtonTitle: React.PropTypes.string,
    onSucess: React.PropTypes.func,
    onCancel: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      cancelButtonVisible: false,
      cancelButtonTitle: 'Cancel',
    };
  },

  _onPressCancel: function() {
    var self = this;
    requestAnimationFrame(function() {
      self.props.navigator.pop();
      if (self.props.onCancel) {
        self.props.onCancel();
      }
    });
  },

  _onBarCodeRead: function(result) {
    var self = this, qrcode = result.data, amount = this.props.amount;

    if (this.barCodeFlag) {
      this.barCodeFlag = false;

      console.info('-----this.barCodeFlag----->' + this.barCodeFlag);

        Vibration.vibrate();

        self.barCodeFlag = false;
        
        ajax.get({
          url: config.host + '/api/openapi/checkPayment', 
          data: { 
            amount:amount,
            qrAuthCode: qrcode
          }
        }).then(function (json) {
          
          if(json.code != 0){
            return alert(json.message || '扫码失败', function(){
                self.pop();
            });
          };

          self.push({
            title: '订单确认',
            component: require('./order-confirm.js'), 
            passProps: {
              qrcode: qrcode,
              amount: amount,
              timestamp: json.data.timestamp
            }
          });

        }).catch(function (err) {
          alert(err, function(){
            self.pop()
          });
        });
    }
  },

  render: function() {
    var cancelButton = null;
    this.barCodeFlag = true;
    
    if (this.props.cancelButtonVisible) {
      cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle} />;
    }
    
    return (
      <Camera onBarCodeRead={this._onBarCodeRead} captureAudio={false} style={styles.camera}>
        <View style={styles.rectangleContainer}>
          <View style={styles.rectangle}/>
        </View>
        {cancelButton}
      </Camera>
    );
  },
});

var CancelButton = React.createClass({
  render: function() {
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
    height: 568,
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
    borderWidth: 2,
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