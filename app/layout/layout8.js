'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,Alert, AlertIOS,
} from 'react-native';

var Widget = require('../widget/widget.js');

var {
  Style,
  Password,
  Separator,
  alert
} = Widget;

var layout = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  onInputPassword: function(text){
    
    if(text.length === 6){
      alert('密码错误');
    }
  },

  render: function(){
    return (
      <View style={[Style.mix('page', 'flex'), styles.container]}>
        <RN.ScrollView>
          <View>
            <Separator/>
            <View style={[Style.mix('center'), {height: 50}]}>
              <Text style={[Style.mix('text', 'strong')]}>请输入您的交易密码，以认证身份</Text>
            </View>
            <Password ref="password" 
              onChange={this.onInputPassword}/>
          </View>
        </RN.ScrollView>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({
  container: {
    paddingTop:20
  }
});

module.exports = layout;