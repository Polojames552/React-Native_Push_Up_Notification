import React, {useEffect, useState} from 'react';
import {Button, View, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
const Request = () => {
  const [recieveToken, setRecieveToken] = useState('');
  const handlePress = async () => {
    try {
      await messaging().requestPermission();
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      setRecieveToken(token);

      // Call the function to send a push notification
      sendPushNotification(token);
    } catch (error) {
      console.error('Error requesting FCM permission:', error);
    }
  };

  const sendPushNotification = async deviceToken => {
    // try {
    //   const response = await fetch('your_cloud_function_endpoint', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ token: deviceToken }),
    //   });

    //   if (response.ok) {
    //     console.log('Push notification sent successfully');
    //   } else {
    //     console.error('Failed to send push notification');
    //   }
    // } catch (error) {
    //   console.error('Error sending push notification:', error);
    // }
    const InsertAPIURL =
      'https://krichsecret.000webhostapp.com/PushNotification.php';
    const header = {
      'Content-Type': 'application/json',
    };
    const Data = {
      token: deviceToken,
    };
    console.log(Data);
    fetch(InsertAPIURL, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(Data),
    });
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   return response.json();
    // })
    // .then(response => {
    //   if (response && response.success) {
    //     Alert.alert('Attention', response.message);
    //     console.log('Response: ', response);
    //   } else {
    //     // Handle the case where 'success' or 'message' is not present in the response
    //     console.error(
    //       'Invalid response format: Missing success or message property',
    //     );
    //   }
    // })
    // .catch(error => {
    //   Alert.alert('Attention', `Network error: ${error.message}`);
    // });
  };
  useEffect(() => {
    // const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   const {title, body} = remoteMessage.notification;
    //   Alert.alert(title, body);
    //   console.log('Received FCM Notification:', remoteMessage);
    // });
    // return unsubscribe;
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {title, body} = remoteMessage.notification;
      // Alert.alert(title, body);
      PushNotification.localNotification({
        title: title,
        message: body,
        channelId: recieveToken,
      });
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <Button title="Send Push Notification" onPress={handlePress} />
    </View>
  );
};

export default Request;
