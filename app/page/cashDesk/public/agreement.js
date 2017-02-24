import React, { Component } from 'react';
// 控件
var Widget = require('../../widget/widget');
var {
    Style,
    WebView
} = Widget;

var formatUrlParam = function( str, param ) {
    var nextUrl = str;
    var ustr = '?';
    var index = 0;
    for( var key in param ) {
        if( index > 0 ) {
            ustr += "&"+key;
            ustr += "=" + param[key];
        }else{
            ustr += key;
            ustr += "=" + param[key];
        }
        index++;
    }
    nextUrl += ustr;
    return nextUrl;
};
var commParam = null;
var prefixUrl = 'http://106.2.100.249:8182';
var AgreementPage = React.createClass({
    getInitialState : function() {
        return {
            uri : ''
        }
    },
    componentDidMount : function() {
        commParam = this.props.commParam;
        var realname = this.props.realname;
        var agreeObj = this.props.agreeObj;
        var url = "";
        if (realname == "1") {
            url = prefixUrl + "/agreement_sign_view"
        } else {
            url = prefixUrl + "/agreement_tmp_view";
        }
        var obj = {
            referenceId : agreeObj.referenceId,
            ownerId : agreeObj.ownerId,
            token : commParam.token
        }
        url = formatUrlParam(url, obj);
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
