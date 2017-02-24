import React, {
    Component,
} from 'react';

import {
    Image,
} from 'react-native';

var icons = {
    'login': {
        source: require('./images/login_img.png'),
        width: 334,
        height: 286,
    },
    'orders': {
        source: require('./images/orders.png'),
        width: 356,
        height: 345,
    },
    'scan': {
        source: require('./images/scan.png'),
        width: 356,
        height: 345,
    },
    'loading': {
        source: require('./images/loading.gif'),
        width: 18,
        height: 18,
    },
    'user': {
        source: require('./images/icon_user.png'),
        width: 20,
        height: 20,
    },
    'pwd': {
        source: require('./images/icon_pwd.png'),
        width: 20,
        height: 20,
    },
    'success': {
        source: require('./images/icon_success.png'),
        width: 70,
        height: 70,
    },
    'failure': {
        source: require('./images/icon_failure.png'),
        width: 70,
        height: 70,
    },
    'info': {
        source: require('./images/icon_info.png'),
        width: 70,
        height: 70,
    },
    'fence': {
        source: require('./images/fence.png'),
        height: 28.5,
    },
    'arrowdown': {
        source: require('./images/icon_arrowdown.png'),
        width: 26,
        height: 14,
    },
    'arrowup': {
        source: require('./images/icon_arrowup.png'),
        width: 26,
        height: 14,
    },
    'order_header': {
        source: require('./images/order_header.png'),
        width: 496,
        height: 25,
    },
    'order_footer': {
        source: require('./images/order_footer.png'),
        width: 496,
        height: 25,
    },
    'no_order': {
        source: require('./images/no_order.png'),
        width: 132,
        height: 146,
    },
};

class Icon extends Component {

    render() {
        var size;
        var icon = Object.assign({}, icons[this.props.name] || {
            width: 0,
            height: 0
        });

        if(this.props.retina){
            icon.width = icon.width && icon.width / 2;
            icon.height = icon.height && icon.height / 2;
        };

        if(this.props.autoSize){

        }else{
            size = {
                width: icon.width,
                height: icon.height
            };
        };
        
        return (
            <Image
                style={[size, this.props.style]}
                source={icon.source} 
                {...this.props}/>
        );

    }
};

module.exports = Icon;