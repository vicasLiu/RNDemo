
var mixin = {

  _navigatorMethod: function(name, args){
    var nav = this.props.navigator;
    if(nav && (typeof nav[name] === 'function')){
      return nav[name].apply(nav, args);
    }
  },
  
  method: function(fnName){
    var args = Array.prototype.slice.call(arguments, 1);

    return function(){
      var fn = this[fnName];
      if(typeof fn === 'function'){
        fn.apply(this, args);
      };
    }.bind(this);
  },

  push: function(){
    return this._navigatorMethod('push', arguments);
  },

  pop: function(){
    return this._navigatorMethod('pop', arguments);
  },

  popN: function(){
    return this._navigatorMethod('popN', arguments);
  },

  popToTop: function(){
    return this._navigatorMethod('popToTop', arguments);
  },

  replace: function(){
    return this._navigatorMethod('replace', arguments);
  },

  replacePrevious: function(){
    return this._navigatorMethod('replacePrevious', arguments);
  },

  resetTo: function(){
    return this._navigatorMethod('resetTo', arguments);
  }

};

module.exports = mixin;