import React, { Component } from 'react';

import RN, {
  StyleSheet,
  PixelRatio,
  View,
  Text,
} from 'react-native';

var styles = StyleSheet.create({
  form: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    borderBottomWidth: 1,
    borderBottomColor: '#CCC' 
  }
});


// 
module.exports = React.createClass({
    
  getInitialState: function(){
      return {};
  },
  
  // 
  render: function(){
      
    return (
      <View
        style={[styles.form]}>
        {this.props.children}
      </View>
    );
  }
});