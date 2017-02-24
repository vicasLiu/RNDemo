import { Alert } from 'react-native';

export default function (msg, callback) {

  if(typeof msg === 'object'){
    msg = JSON.stringify(msg);
  };

  Alert.alert(msg + '', null, [
    {
      text: '确定', 
      onPress: () => {
        if(typeof callback === 'function') {
          callback();
        };
      }
    }
  ]);
  
};;