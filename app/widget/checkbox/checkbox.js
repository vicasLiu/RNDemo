'use strict';

import React, { Component } from 'react';
var PropTypes = React.PropTypes;

import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,Alert, AlertIOS,
} from 'react-native';

var images = {
  'default': {
    yes: require('./images/checkbox_checked@2x.png'),
    no:  require('./images/checkbox@2x.png')
  },
  'circle': {
    yes: require('./images/circle/checkbox_checked.png'),
    no:  require('./images/circle/checkbox.png')
  }
};

var CheckBox = React.createClass({
  propTypes: {
    label: PropTypes.string,
    labelStyle: PropTypes.object,
    checked: PropTypes.bool,
    onChange: PropTypes.func
  },

  getDefaultProps() {
    return {
      label: '',
      type: '',
      labelBefore: false,
      checked: false
    }
  },

  getInitialState(){
    return {
      type: this.props.type,
      checked: this.props.checked
    }
  },

  onChange() {

    if(this.props.onChange){
      var result = this.props.onChange(!this.state.checked);
      if(result === false){
        return;
      }
    };

    this.setState({
      checked: !this.state.checked
    });
  },

  render() {

    var image = images[this.state.type] || images.default;
    var source = this.state.checked ? image.yes : image.no;

    var container = (
      <View style={styles.container}>
        <Image
          ref="img"
          style={styles.checkbox}
          source={source}/>
      </View>
    );

    return (
      <TouchableOpacity 
        style={[this.props.style]}
        onPress={this.onChange} 
        activeOpacity={0.9}>
        {container}
      </TouchableOpacity>
    )
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20
  }
});

module.exports = CheckBox;
