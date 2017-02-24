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
      cards: [
        {
          number: '2342342234239527',
          bank: 'icbc',
          checked: true
        },
        {
          number: '2342342342349528',
          bank: 'icbc'
        },
        {
          number: '2342342343242321',
          bank: 'boc'
        }
      ]
    };
  },

  

  render: function(){
    return (
      <View style={Style.mix('page', 'flex')}>
        <RN.ScrollView>
          <View>
            <Widget.CardList cards={this.state.cards} 
              onSelect={this.onBankSelect}
              ref="bankList"/>
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