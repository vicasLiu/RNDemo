import React, { Component } from 'react';
import { 
    StyleSheet, 
    AppRegistry, 
    View,
    Text,
    ScrollView,
    NavigatorIOS
} from 'react-native';

import Style from '../ui/style.js'
import Login from './index.js'

var styles = {
    container: {
    }
}

class Index extends Component{

    
 
    render(){
        
        return (
            <NavigatorIOS
                style={[{
                    flex: 1,
                    flexDirection: 'column',
                }, styles.container]}
                navigationBarHidden={false}
                barTintColor={Style.bgColor}
                tintColor={Style.textColor}
                titleTextColor={Style.textColor}
                interactivePopGestureEnabled={true}
                shadowHidden={true}
                translucent={false}
                initialRoute={{
                    title: '商户客户端',
                    component: Login
                }} />
        );
    }
}

module.exports = Index;