import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

global.storage = global.storage || new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000*3600*24,
    enableCache: true,
});

module.exports = global.storage;