import { Navigation } from 'react-native-navigation';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.FirstTabScreen', () => require('./bsc/index.js'));
  Navigation.registerComponent('example.SecondTabScreen', () => require('./bsc/login.js'));
}