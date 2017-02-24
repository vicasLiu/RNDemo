import React, { Component } from 'react';
// 控件
var Widget = require('../../widget/widget');
var {
    Style,
    WebView
} = Widget;
var AgreementPage = React.createClass({
    getInitialState : function() {
        return {
            uri : ''
        }
    },
    componentDidMount : function() {
        var url = this.props.uri;
        this.setState({
            uri : url
        });
    },
    render : function() {
        return (
            <WebView source={{ uri: this.state.uri }}></WebView>
        )
    }
});

module.exports = AgreementPage;
