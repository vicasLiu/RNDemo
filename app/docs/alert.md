#Widget.Alert 控件

引用:
```
import React, { Component } from 'react';
var Widget = require('../widget/widget.js');
var Alert = Widget.Alert;
```

用法:
```
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
```
