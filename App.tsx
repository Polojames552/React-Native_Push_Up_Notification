import React, {useEffect} from 'react';
import {Button, View, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import Request from './src/RequestPermission';
import PushNotification from 'react-native-push-notification';
const App = () => {
  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification:', notification);
        // Handle the notification here (e.g., display an Alert)
        Alert.alert(notification.title, notification.message);
      },
      // Do not specify the channelId here
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    // Subscribe to FCM messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      // Alert.alert(title, body);
      PushNotification.localNotification({
        title: title,
        message: body,
        channelId:
          'fExD4LXFSsOOBL6erTRMPU:APA91bFu6x2GTiIDvy9QtXxY81yMQAFe46zE6dVfEBB-_N1SyvClIzuioQBjoaZK38n5IGgG9TMKK_n0dNKxugH7cP0eoteQw3iT22-Ybbobl3UT9JgAyuneILXNJ4TjW8pZngrOnChq',
      });
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <Request />
    </View>
  );
};

export default App;
