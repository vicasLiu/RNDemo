'use strict';
import React, { Component } from 'react';
var Url = "http://106.2.100.249:8182/";
// var Url = 'http://172.16.19.15:8081/pirate-cashier/'
var formatParam = function( param ) {
  var ustr = '';
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
  return ustr;
};
var Services = {
    get : function(obj) {
        var query = obj.url;
        var callback = obj.success;
        var error = obj.error;
        var str = '';
        if( query.split("http").length == 1 ) {
            query = Url + query;
        }
        if( obj.data != undefined ) {
            str = formatParam(obj.data);
            query += "?" + str;
        }
        console.info(query);
        fetch(query,{
            method:"GET",
            headers : {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(response => response.json())
          .then(json => callback(json))
          .catch(error => {
              console.info(error);
          });
    },
    post : function( obj ) {
        var callback = obj.success;
        var url = obj.url;
        if( url.split("http").length == 1 ) {
            url = Url + url;
        }
        console.info(url);
        console.info(obj.data);
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: formatParam(obj.data)
      }).then(response => response.json())
        .then(json => callback(json))
          .catch(error => {
            console.info(error);
          });
    }
};
module.exports = Services;
