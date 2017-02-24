import React, { Component } from 'react';

var ActionSheet = function(){
  ActionSheet.actions.apply(null, arguments);
};

/* 用法示例：

ActionSheet.actions([
  {
    text: 'button 1',
    onPress: function(){
      //
    }
  },
  {
    text: 'button 2',
    data: [1,2,3,4],
    onPress: function(data){
      //
      console.log(data.length);
    }
  }
]);


ActionSheet.shareActions({
  url: 'http://baidu.com'
});
 */

// 普通按钮
ActionSheet.actions = function(opts){
  var options = [];
  var callbacks = [];
  var params = [];
  //
  var callback = function(index){
    var cb = callbacks[index];
    var data = params[index];
    var args = data ? [data] : [];

    if(typeof cb === 'function'){
      cb.apply(null, args);
    };
  };
  var option;

  if(opts.constructor === Array){
    opts.forEach(function(option, index){
      options.push(option.text || text);
      callbacks.push(option.onPress);
      params.push(option.data);
    });
  }else{
    throw 'ActionSheet.action(opt)的参数opt应该是一个数组';
  };

  // 取消按钮
  options.push('取消');
  callbacks.push(undefined);
  params.push(undefined);

  // 弹出
  React.ActionSheetIOS.showActionSheetWithOptions({
    options: options,
    cancelButtonIndex: options.length - 1
  }, callback);

};


// 共享按钮
ActionSheet.shareActions = function(opts){

  opts = Object.assign({
    success: function(){},
    failure: function(){}
  }, opts);

  // 弹出
  React.ActionSheetIOS.showShareActionSheetWithOptions(opts, opts.failure, opts.success);
};

module.exports = ActionSheet;