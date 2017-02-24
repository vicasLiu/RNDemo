'use strict';

import React, { Component } from 'react';

import RN, {
  StyleSheet,
  View,
  Text,Alert, AlertIOS,
} from 'react-native';

var alert = Alert.alert;

var Widget = require('../widget/widget.js');

var {
  Style
} = Widget;

var layout = React.createClass({

  getInitialState: function(){
    return {
    };
  },

  render: function(){
    return (
      <View style={Style.mix('page', 'flex')}>
        <RN.ScrollView>
          <View>
            <Widget.BankList ref="banklist" banks={Widget.BankList.banks} />
          </View>
        </RN.ScrollView>
      </View>
    );
  }
});

// styles
var styles = StyleSheet.create({

});

module.exports = layout;