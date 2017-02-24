import { Alert } from 'react-native';

var alert = function (msg, callback) {

  if(typeof msg === 'object'){
    msg = JSON.stringify(msg);
  };

  Alert.alert(msg + '', null, [
    {
      text: '确定', 
      onPress: callback || function(){}
    }
  ]);
};

module.exports = alert;