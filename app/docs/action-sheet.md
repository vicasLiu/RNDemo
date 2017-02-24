#Api.ActionSheet

引用:

```
import React, { Component } from 'react';
var Api = require('../api/api.js');
```

弹出按钮组:

```
Api.ActionSheet([
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
```


分享:

```
Api.ActionSheet.shareActions({
  url: 'http://baidu.com'
});
```
