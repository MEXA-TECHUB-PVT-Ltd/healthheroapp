import PushNotification, {Importance} from 'react-native-push-notification';

// import NotificationHandler from './NotificationHandler';

// export default class NotifService {
  // constructor(onRegister, onNotification) {
  //   this.lastId = 0;
  //   this.lastChannelCounter = 0;

  //   this.createDefaultChannels();

  //   NotificationHandler.attachRegister(onRegister);
  //   NotificationHandler.attachNotification(onNotification);

  //   // Clear badge number at start
  //   PushNotification.getApplicationIconBadgeNumber(function (number) {
  //     if (number > 0) {
  //       PushNotification.setApplicationIconBadgeNumber(0);
  //     }
  //   });

  //   PushNotification.getChannels(function (channels) {
  //     console.log(channels);
  //   });
  // }

  // createDefaultChannels() {
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'custom-channel-id', // (required)
  //       channelName: `custom channel`, // (required)
  //       channelDescription: 'custom  notification channel', // (optional) default: undefined.
  //       soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  //       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  //     },
  //     created =>
  //       console.log(`createChannel 'default-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'sound-channel-custom', // (required)
  //       channelName: `Sound channel`, // (required)
  //       channelDescription: "custom's sound channel", // (optional) default: undefined.
  //       soundName: 'sample.mp3', // (optional) See `soundName` parameter of `localNotification` function
  //       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  //     },
  //     created =>
  //       console.log(`createChannel 'sound-channel-id' returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  // }

  // createOrUpdateChannel() {
  //   this.lastChannelCounter++;
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'custom-channel-id', // (required)
  //       channelName: `Custom channel - Counter: ${this.lastChannelCounter}`, // (required)
  //       channelDescription: `A custom channel to categorise your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
  //       soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
  //       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  //     },
  //     created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  // }

  // popInitialNotification() {
  //   PushNotification.popInitialNotification(notification =>
  //     console.log('InitialNotication:', notification),
  //   );
  // }
  // localNotif(notifType) {
  //   const notifData = this.getNotification(notifType);

  //   // this.lastId++;
  //   PushNotification.localNotification({
  //     /* Android Only Properties */
  //     // channelId: soundName ? 'sound-channel-id' : 'default-channel-id',
  //     channelId: 'custom-channel-id',
  //     ticker: 'My Notification Ticker', // (optional)
  //     autoCancel: true, // (optional) default: true
  //     largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
  //     smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
  //     bigText: notifData.bigText, // (optional) default: "message" prop
  //     subText: notifData.subText, // (optional) default: none
  //     // color: 'green', // (optional) default: system default
  //     vibrate: true, // (optional) default: true
  //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  //     tag: 'some_tag', // (optional) add tag to message
  //     group: 'group', // (optional) add group to message
  //     groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
  //     ongoing: false, // (optional) set whether this is an "ongoing" notification
  //     // actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
  //     invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

  //     when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
  //     usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
  //     timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

  //     /* iOS only properties */
  //     category: '', // (optional) default: empty string

  //     /* iOS and Android properties */
  //     id: notifType, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
  //     title: notifData.title, // (optional)
  //     message: notifData.message, // (required)
  //     userInfo: {screen: 'Home', notifType: notifType}, // (optional) default: {} (using null throws a JSON value '<null>' error)
  //     // playSound: !!soundName, // (optional) default: true
  //     // soundName: soundName ? soundName : 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  //     soundName: 'default',
  //     number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  //   });
  // }

  // scheduleNotif(notifType, notifDate) {
  //   const notifData = this.getNotification(notifType);

  //   PushNotification.localNotificationSchedule({
  //     date: notifDate, // in 30 secs

  //     /* Android Only Properties */
  //     channelId: 'custom-channel-id',
  //     ticker: 'custom Ticker', // (optional)
  //     autoCancel: true, // (optional) default: true
  //     largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
  //     smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
  //     bigText: notifData.bigText, // (optional) default: "message" prop
  //     subText: notifData.subText, // (optional) default: none
  //     color: 'blue', // (optional) default: system default
  //     vibrate: true, // (optional) default: true
  //     vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  //     tag: 'some_tag', // (optional) add tag to message
  //     group: 'group', // (optional) add group to message
  //     groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
  //     ongoing: false, // (optional) set whether this is an "ongoing" notification
  //     // actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
  //     invokeApp: false, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

  //     when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
  //     usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
  //     timeoutAfter: 3600000 * 23, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

  //     /* iOS only properties */
  //     category: '', // (optional) default: empty string

  //     /* iOS and Android properties */
  //     id: notifType, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
  //     title: notifData.title, // (optional)
  //     message: notifData.message, // (required)
  //     userInfo: {screen: 'Home', notifType: notifType}, // (optional) default: {} (using null throws a JSON value '<null>' error)
  //     // playSound: !!soundName, // (optional) default: true
  //     soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  //     number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  //   });
  // }

  // checkPermission(cbk) {
  //   return PushNotification.checkPermissions(cbk);
  // }

  // requestPermissions() {
  //   return PushNotification.requestPermissions();
  // }

  // cancelNotif(id) {
  //   PushNotification.cancelLocalNotifications({id: '' + id});
  // }

  // cancelAll() {
  //   PushNotification.cancelAllLocalNotifications();
  // }

  // abandonPermissions() {
  //   PushNotification.abandonPermissions();
  // }

  // getScheduledLocalNotifications(callback) {
  //   PushNotification.getScheduledLocalNotifications(callback);
  // }

  // getDeliveredNotifications(callback) {
  //   PushNotification.getDeliveredNotifications(callback);
  // }
  // removeDeliveredNotifications() {
  //   PushNotification.removeDeliveredNotifications();
  // }
  // getNotification(notifType) {

  //   switch (notifType) {
  //     case "lang_en": return { title: "English", message: strings.DUMMY_TEXT };
  //     case "lang_sv": return { title: "Swedish", message: strings.DUMMY_TEXT };
  //     case "lang_ur": return { title: "Urdu", message: strings.DUMMY_TEXT };
  //     case "welcome": return { title: "Welcome", message: "You can show different engaging messages." }
  //   }
  // }
// }

// import PushNotification from "react-native-push-notification";

// export const notificationAndroid = () => {
//     PushNotification.createChannel(
//       {
//         channelId:'shadipk28',
//         channelName:'shadipk'

//       }
//     )

//   }

// export const pushLocalNotificationAndroid = (item,text) => {
//     PushNotification.localNotification(
//       {
//         channelId:'shadipk28',
//         title:`${text}`,
//         message:'',
//         // userInfo:{item}

//       }
//     )
//   }

// export const removeApplicationIconBadgeNumberAndroid = () => {
//   PushNotification.setApplicationIconBadgeNumber(0)
// }
// export const setApplicationIconBadgeNumberAndroid = (num) => {
//   PushNotification.setApplicationIconBadgeNumber(num)
// }



PushNotification.localNotification({
  /* Android Only Properties */
  channelId: "your-channel-idew", // (required) channelId, if the channel doesn't exist, notification will not trigger.
  ticker: "My Notification Ticker", // (optional)
  showWhen: true, // (optional) default: true
  autoCancel: true, // (optional) default: true
  largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
  largeIconUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
  smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
  bigText: "My big text that will be shown when notification is expanded. Styling can be done using HTML tags(see android docs for details)", // (optional) default: "message" prop
  subText: "This is a subText", // (optional) default: none
  bigPictureUrl: "https://www.example.tld/picture.jpg", // (optional) default: undefined
  bigLargeIcon: "ic_launcher", // (optional) default: undefined
  bigLargeIconUrl: "https://www.example.tld/bigicon.jpg", // (optional) default: undefined
  color: "red", // (optional) default: system default
  vibrate: true, // (optional) default: true
  vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
  tag: "some_tag", // (optional) add tag to message
  group: "group", // (optional) add group to message
  groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
  ongoing: false, // (optional) set whether this is an "ongoing" notification
  priority: "high", // (optional) set notification priority, default: high
  visibility: "private", // (optional) set notification visibility, default: private
  ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
  shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
  onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
  
  when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
  usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
  timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

  messageId: "google:message_id", // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module. 

  actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
  invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

  /* iOS only properties */
  category: "", // (optional) default: empty string
  subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

  /* iOS and Android properties */
  id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
  title: "My Notification Title", // (optional)
  message: "My Notification Message", // (required)
  picture: "https://www.example.tld/picture.jpg", // (optional) Display an picture with the notification, alias of `bigPictureUrl` for Android. default: undefined
  userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
  playSound: false, // (optional) default: true
  soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
  number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
});