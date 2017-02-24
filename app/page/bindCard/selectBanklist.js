'use strict';
import React, { Component } from 'react';
var $http = require("../../services/services");

// 控件
var Widget = require('../../widget/widget');
var {
    Style,
    Form,
    BankList,
    Loading
} = Widget;

var commParam = null;
import {
    ScrollView,
    StyleSheet,
    View,Alert, AlertIOS,
} from 'react-native';
var getBankList = function( cb ) {
    $http.post({
        url : "cashierAPI/getBankList",
        data : commParam,
        success : function( data ) {
            cb(data);
        }
    });
};
var BankListPage = React.createClass({
    getInitialState: function(){
      return {
        cards: [

        ]
      };
    },
    updateCard : function( arr ) {
        var cards = this.state.cards;
        var bankList = this.refs.bankList;
        for( var i = 0; i < arr.length; i++ ) {
            // 添加银行卡
            cards.push({
            //   number: arr[i].bankCode,
              bankCode : arr[i].bankCode,
              bank: arr[i].bankCode.toLocaleLowerCase()
            });
        }
        bankList.setState({
          cards: cards
        });
    },
    onSelectBank : function( card ) {
        console.info(card);
        console.info(this.props);
        var fn = this.props.getBankInfo;
        fn(card);
        var navigator = this.props.navigator;
        navigator.pop();
    },
    componentDidMount : function() {
        this.refs.loading.show();
        commParam = this.props.commParam;
        var _this = this;
        if( commParam == undefined ) {
            commParam = {};
        }
        getBankList(function( data ){
            _this.refs.loading.hide();
            _this.updateCard(data.data);
        });
    },
    render : function() {
        return(
            <ScrollView style={[styles.container]}>
                <Loading ref="loading" />
                <View>
                    <BankList ref="bankList" onSelect={this.onSelectBank}></BankList>
                </View>
            </ScrollView>
        )
    },
});
var styles = StyleSheet.create({
    container:{
    	backgroundColor:'#E6E9EB',
    	flex:1,
  	}
});
module.exports = BankListPage;
