import { NavigatorIOS } from 'react-native';

class Navigator extends NavigatorIOS {

  // 初始化
  constructor(props) {
    super(props);

    // 
    this.orign = {
      push: this.push,
      replace: this.replace,
      replacePrevious: this.replacePrevious,
      resetTo: this.resetTo
    };

    // 替代原本的push方法，让其可接受string型的route参数
    // 
    this.push = function(){
      this._navigatorMethod('push', arguments);
    }.bind(this);

    this.replace = function(){
      this._navigatorMethod('replace', arguments);
    }.bind(this);

    this.replacePrevious = function(){
      this._navigatorMethod('replacePrevious', arguments);
    }.bind(this);

    this.resetTo = function(){
      this._navigatorMethod('resetTo', arguments);
    }.bind(this);

  }

  _navigatorMethod(name, args){
    var method = this.orign[name];
    var route = args[0];

    if(typeof method !== 'function'){
      return;
    };

    // 如果第一个参数为string，
    // 则认为调用的是 push\replace\replacePrevious\resetTo 方法
    if(typeof route === 'string'){

      route = this.getComponent(route);

      if(!route){
        console.log('not found component called "' + args[0] + '"');
        return;
      };

      if({
          push: 1,
          jumpTo: 1,
          replace: 1,
          replaceAtIndex: 1,
          replacePrevious: 1,
          resetTo: 1,
          popToRoute: 1
        }[name]){
        route.name = args[0];
      };

      // 第二个参数
      if(typeof args[1] === 'object'){
        route = Object.assign(route, args[1]);
      };

      console.info(route);

      //
      method.call(this, route);
    }else{
      method.apply(this, args);
    };
  }

  // 取得所有组件
  getComponents(){
    return this.props.components || {};
  }

  // 根据名称取得组件
  getComponent(name){
    var mod = this.getComponents()[name] || null;
    return mod;
  }
}

module.exports = Navigator;