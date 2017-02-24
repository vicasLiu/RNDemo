'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,Alert, AlertIOS,
} from 'react-native';

var alert = Alert.alert;

var Widget = require('../widget/widget.js');

var {
  Style,
  VCode,
  Button
} = Widget;

var layout = React.createClass({

  render: function(){
    return (
      <View style={[Style.mix('page', 'flex')]}>
        <RN.ScrollView>
          <VCode
              label='验证码'
              placeholder='请输入验证码'
              buttonText='发送'
              maxLength={4}
              count={60}
              style={{
                backgroundColor: '#FFF'
              }}
            />
        </RN.ScrollView>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;