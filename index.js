/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  // onRegister: function (token) {
  //   console.log('TOKEN:', token);
  // },
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    let data = notification?.data;
    console.log('notification  ::: ', notification);
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
    // requestPermissions: Platform.OS === 'ios',
  },
  // onAction: function (notification) {
  //   console.log('ACTION:', notification.action);
  //   console.log('NOTIFICATION:', notification);

  //   // process the action
  // },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  // onRegistrationError: function (err) {
  //   console.error(err.message, err);
  // },
  // popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
   requestPermissions: Platform.OS === 'ios'
});

AppRegistry.registerComponent(appName, () => App);
