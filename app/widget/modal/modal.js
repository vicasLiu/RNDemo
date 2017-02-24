'use strict';
import React, { Component } from 'react';
var Style = require('../style/style');
var Button = require('../button/button');
var Icon = require('../icon/icon');
var Separator = require('../separator/separator');

import RN, {
  StyleSheet,
  View,
  Modal,
  Text,Alert, AlertIOS,
} from 'react-native';

var styles, widget;

// 
widget = React.createClass({
  getInitialState() {
    return {
      modalVisible: false,
      transparent: true,
    };
  },

  open() {
    this.setState({modalVisible: true});
  },

  close() {
    this.setState({modalVisible: false});
  },

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;

    return (
      <Modal
        transparent={this.state.transparent}
        animationType={this.props.animationType || "slide"}
        visible={this.state.modalVisible}>
        <View style={[styles.container, modalBackgroundStyle]}>
          
          <View style={[
            styles.innerContainer, 
            innerContainerTransparentStyle
          ]}> 
            
            { !this.props.closeText && (

              <View style={[styles.closeIcon, this.props.closeIconStyle]}>
                <RN.TouchableOpacity onPress={this.close} style={styles.closeIconTouch}>
                  <Icon icon="close-20-20" />
                </RN.TouchableOpacity>
              </View>
            )}

            {this.props.children}
            
            { this.props.closeText && (
              <Button text={this.props.closeText || '关闭'} style={[{
                  width: 100,
                  height: 35,
                  backgroundColor: '#CCC'
                }]}
                onPress={this.close}
              />
            )}
          </View>
        </View>
      </Modal>
    );
  }
});

// styles
styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  header: {
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
    height: 30,
    backgroundColor: 'red'
  },
  closeIcon:{
    position: 'absolute',
    left: 3,
    top: 3,
    width: 30,
    height: 30
  },
  closeIconTouch:{ 
    width: 30,
    height: 30
  }
});

module.exports = widget;