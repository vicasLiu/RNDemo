#路由功能解决方案

假设起始页面index有一个导航控件，初始页面是A。

从A可以跳转到B，从B又可以跳转到C，从C又可以跳转到A。

###传统方案是：

1. 在index中通过`require('./a.js')`得到A；
2. 在Navigator控件的属性中设置initialRoute.compoment为A；
3. A页面就显示出来了。
4. 在A页面通过`require('./b.js')`得到B页面。
5. 在某个方法中调用`this.props.navigator.push`方法并传入B作为参数。
6. 就跳转到B页面了。 
7. 同理，B要`require('./c.js')`， C要require`('./a.js')`，因此形成了循环引用。


###新的解决方案是：

1. 在`core/components.js`中require所有的页面（不包括index）；
2. 在index中`require(./core/components.js)`得到变量components；
3. 用自定义的Widget.Navigator创建导航控件；
4. 把A页面对于的配置components['a']变量传给导航的initialRoute属性；
5. 在A、B、C页面中通过`this.props.navigator.push('x')`来进行跳转，'x'是A、B、C在components.js中的对应key值，因此A、B、C中不再需要require其它页面；

一句话来说，就是Navigator知道所有页面，页面跳转时只要告诉Navigator你要跳转的页面的名字就可以了。

代码示例：

components.js:

```
var components = {
  
  a: {
    title: '页面a',
    component: require('../layout/a'),
  },
  
  b: {
    title: '页面b',
    component: require('../layout/b'),
  },
  
  c: {
    title: '页面c',
    component: require('../layout/c'),
  }
};

module.exports = components;
```

index.js:

```
import React, { Component } from 'react';
var Components = require('../core/components.js');
var Widget = require('../widget/widget.js');
var A = Components['a'];

var IndexCompoent = React.createClass({
  render: function(){
    return (
      <Widget.Navigator
        components={Components}
        initialRoute={A} />
    );
  }
});

module.exports = IndexCompoent;
```


a.js:
```
import React, { Component } from 'react';
var NavMinin = require('../core/nav-mixin.js');
var Widget = require('../widget/widget.js');

var page = React.createClass({
  mixins: [NavMinin],
  render: function(){
    return (
      <React.View>
        <Widget.Button text="去页面B" onPress={this.method('push', 'b')} />
      </React.View>
    );
  }
});

module.exports = page;
```


b.js:
```
import React, { Component } from 'react';
var NavMinin = require('../core/nav-mixin.js');
var Widget = require('../widget/widget.js');

var page = React.createClass({
  mixins: [NavMinin],
  render: function(){
    return (
      <React.View>
        <Widget.Button text="去页面C" onPress={this.method('push', 'c', {
            passProps: {
                argumentA: 123
            }
        })} />
      </React.View>
    );
  }
});

module.exports = page;
```


c.js:
```
import React, { Component } from 'react';
var NavMinin = require('../core/nav-mixin.js');
var Widget = require('../widget/widget.js');

var page = React.createClass({
  mixins: [NavMinin],
  render: function(){
    return (
      <React.View>
        <Widget.Button text="去页面A" onPress={this.method('push', 'a')} />
      </React.View>
    );
  }
});

module.exports = page;
```