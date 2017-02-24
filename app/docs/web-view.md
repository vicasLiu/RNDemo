#Widget.WebView 控件

嵌入网页:
```
import React, { Component } from 'react';
var Widget = require('../widget/widget.js');

module.exports = React.createClass({
  render: function(){
    return (
      <Widget.WebView 
        source={{ uri: 'http://baidu.com' }}
      />
    );
  }
});
```

嵌入HTML:
```
import React, { Component } from 'react';
var Widget = require('../widget/widget.js');

module.exports = React.createClass({
  render: function(){
    return (
      <Widget.WebView 
        source={{ html: '<h1>hello!</h1>' }}
      />
    );
  }
});
```
