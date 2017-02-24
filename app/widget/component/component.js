import React from 'react';

class Component extends React.Component {

  constructor(props) {
    super(props);
    //
    console.info('custom component');
  }

  push(){
    var nav = this.props.navigator;
    if(nav){
      nav.push.apply(nav, arguments);
    }
  }

}

module.exports = Component;