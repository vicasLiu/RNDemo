import React, { Component } from 'react';

var Alert = function(){
  Alert.alert.apply(null, arguments);
};

/*

Alert.alert('消息正文');

Alert.alert('标题', '消息正文');

Alert.alert('标题', '消息正文', {
  '按钮文字': function(){
    console.log('按钮被点击');
  }
});

Alert.alert(
  '标题', 
  '消息正文', 
  [
    {
      '按钮1文字': function(){
        console.log('按钮1被点击');
      }
    },{
      '按钮2文字': function(){
        console.log('按钮2被点击');
      }
    }
  ]
);


 */
Alert.alert = function(){

  var args = arguments,
    opt = args[0];

  // 
  if(typeof opt !== 'object'){
    opt = {};
    if(typeof args[0] === 'string'){
      if(typeof args[1] === 'string'){
        opt.title = args[0];
        opt.message = args[1];
      }else{
        opt.message = args[0];
      };
    };
  };

  opt = Object.assign({
    title: '提示',
    message: '',
    buttons: [],
    cancelButtonText: '取消',
    hasCancelButton: true,
    onCancel: function(){}
  }, opt);

  if(opt.hasCancelButton !== false || !opt.buttons.length){
    //
    opt.buttons.push({
      text: opt.cancelButtonText,
      onPress: opt.onCancel
    });
  };
  
  AlertIOS.alert(
    opt.title,
    opt.message,
    opt.buttons
  );
};


module.exports = Alert;