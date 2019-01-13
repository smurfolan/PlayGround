import { Permissions, Notifications } from 'expo';
import firebase from 'firebase';

// Show the user a pop-up to allow for push notifications. If user allows inspect
// store the expo token in the DB.
registerForPushNotificationsAsync = async (userInfo) => {
    const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // Check if there's already a record with such uid and expoToken in DeviceLogins
    let deviceLoginAlreadyExists = false;

    firebase.database().ref('/DeviceLogins')
    .orderByChild('userId')
    .equalTo(userInfo.user.uid)
    .once("value").then(snapshot => {
      // Because user with the same email/password can login from different devices
      snapshot.forEach(function(childSnapshot){
        var availableExpoToken = childSnapshot.val().deviceExpoToken;

        if(availableExpoToken == token){
          deviceLoginAlreadyExists = true
        }
      })
      if(!deviceLoginAlreadyExists){
        firebase.database().ref('DeviceLogins').push({
          userId: userInfo.user.uid,
          deviceExpoToken: token,
          isLoggedIn: true
        })
      }
      else{
        // Just mark the user as logged in
        firebase.database().ref('DeviceLogins')
        .orderByChild('deviceExpoToken')
        .equalTo(token)
        .once('value', function (snapshot) {
          snapshot.forEach(function(child) {
            if(child.val().userId == userInfo.user.uid){
              child.ref.update({isLoggedIn: true});
            }
          })
        })
      }
    });
}

// Handle incoming push notifications
handleNotification = (notification, navigationContext) => {
  if(notification.origin === 'selected'){
      navigationContext.navigate('NewMailItem', {
        mailItemId: notification.data.mailItemId,
        mailboxId: notification.data.mailboxId,
        snapshotUrl: notification.data.snapshotUrl,
        waitForResponseUntil: notification.data.waitForResponseUntil,
        ocrText: notification.data.ocrText
      })
  }
    
};

export default {
  registerForPushNotificationsAsync,
  handleNotification
};