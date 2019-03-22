const functions = require('firebase-functions');
var fetch = require('node-fetch')

// Import Admin SDK
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase);

// Get a database reference
var db = admin.database();

exports.getMyMailboxes = functions.https.onRequest((req, res) => {
    var userId = req.query.userId
    var mailboxesOwnedByThisUser = []
    var userMailboxesResult = []

    return db.ref('/MailboxOwnership')
    .orderByChild('userId')
    .equalTo(userId)
    .once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        if(mailboxesOwnedByThisUser.indexOf(childSnapshot.val().mailboxId) < 0){
          mailboxesOwnedByThisUser.push(childSnapshot.val().mailboxId)
        }
      })

      return Promise.all(mailboxesOwnedByThisUser)
    }).then(mailboxesOwnedByThisUser => {
      return db.ref('/Mailboxes')
      .once('value').then(snapshot => {
        snapshot.forEach(childSnapshot => {
          if(mailboxesOwnedByThisUser.indexOf(parseInt(childSnapshot.key)) > -1){
            userMailboxesResult.push({
              "mailboxId": childSnapshot.key,
              "address": childSnapshot.val().address,
              "city": childSnapshot.val().city,
              "zipCode": childSnapshot.val().zipCode,
              "numberOfMailItems": childSnapshot.val().numberOfMailItems
            })
          }
        })

        return res.send(JSON.stringify(userMailboxesResult))
      })
    })
});

exports.getMailboxItems = functions.https.onRequest((req, res) => {
  var mailboxId = req.query.mailboxId
  var mailboxItems = []

  return db.ref('/MailItems')
    .orderByChild('mailboxId')
    .equalTo(parseInt(mailboxId))
    .once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        mailboxItems.push({
          "mailItemId": childSnapshot.key,
          "ocrText": childSnapshot.val().ocrText,
          "snapshotUrl": childSnapshot.val().snapshotUrl,
          "status": childSnapshot.val().status,
          "receivedAt": childSnapshot.val().receivedAt
        })
      })

      return res.send(JSON.stringify(mailboxItems))
    })
});

exports.getMailboxSettings = functions.https.onRequest((req, res) => {
  var mailboxId = req.query.mailboxId

  return db.ref('/Mailboxes')
    .child(parseInt(mailboxId))
    .once("value")
    .then(snapshot => {
      return res.send(JSON.stringify(snapshot))
  })
});

exports.updateDefaultBoxSettings = functions.https.onRequest((req, res) => {
  if(req.method !== "POST"){
    res.send(405, 'HTTP Method ' + req.method + ' not allowed');
  }

  var mailboxId = req.body.mailboxId
  var timeToWaitBeforeOpenOrCloseNewValue = req.body.timeToWaitBeforeOpenOrClose
  var openByDefaultNewValue = req.body.openByDefault

  db.ref('/Mailboxes/' + mailboxId).update(
    {
      openByDefault: openByDefaultNewValue,
      timeToWaitBeforeOpenOrClose: parseInt(timeToWaitBeforeOpenOrCloseNewValue)
    })
  
  res.status(200).end('/Mailboxes/' + mailboxId)
})

exports.updateMailItemStatus = functions.https.onRequest((req, res) => {
  if(req.method !== "POST"){
    res.send(405, 'HTTP Method ' + req.method + ' not allowed');
  }

  var updatedStatus = req.body.updatedStatus
  var mailItemId = req.body.mailItemId

  db.ref('/MailItems/' + mailItemId).update({status: parseInt(updatedStatus)})

  res.status(200).end('/MailItems/' + mailItemId)
})

exports.sendPushNotification = functions.database.ref('MailItems/{id}').onCreate((change, context) => {
    var usersToBeNotified = []
    var deviceExpoTokens = []

    var changeValue = change.val()

    //return the main promise
    return db.ref('/MailboxOwnership')
    .orderByChild('mailboxId')
    .equalTo(changeValue.mailboxId)
    .once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        if(usersToBeNotified.indexOf(childSnapshot.val().userId) < 0){
          usersToBeNotified.push(childSnapshot.val().userId)
        }
      })

      return Promise.all(usersToBeNotified)
    }).then(usersToBeNotified => {
      return db.ref('/DeviceLogins')
      .once('value').then(snapshot =>{
        snapshot.forEach(childSnapshot => {
          if(childSnapshot.val().isLoggedIn && usersToBeNotified.indexOf(childSnapshot.val().userId) > - 1){
            if(deviceExpoTokens.indexOf(childSnapshot.val().deviceExpoToken) < 0){
              // The format of the message which can be submited via expo is described here:
              // https://docs.expo.io/versions/latest/guides/push-notifications#message-format
              deviceExpoTokens.push(
                {
                    "to": childSnapshot.val().deviceExpoToken,
                    "body": `${changeValue.topScoreImageTag}, ${changeValue.middleScoreImageTag}, ${changeValue.lowestScoreImageTag}`,
                    "data":{
                      "mailboxId": changeValue.mailboxId,
                      "snapshotUrl": changeValue.snapshotUrl,
                      "mailItemId": context.params.id,
                      "waitForResponseUntil": changeValue.waitForResponseUntil,
                      "ocrText": changeValue.ocrText
                    }
                }
              )
            }
          }
        })

        return Promise.all(deviceExpoTokens);
      })
    }).then(deviceExpoTokens => {
      if(deviceExpoTokens.length > 0){
        fetch('https://exp.host/--/api/v2/push/send', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deviceExpoTokens)
        })
      }

      return deviceExpoTokens
    })
})

exports.updateNumberOfMailboxItems = functions.database.ref('MailItems/{id}')
.onUpdate((change) => {
    const before = change.before  // DataSnapshot before the change
    const after = change.after  // DataSnapshot after the change

    if(before.val().status !== 1 && after.val().status === 1){
      db.ref('/Mailboxes').child(before.val().mailboxId)
        .once('value')
        .then(function(snapshot){
          var currentNumberOfMailItems = snapshot.val().numberOfMailItems
          db.ref('/Mailboxes/' + before.val().mailboxId)
          .update({numberOfMailItems: parseInt(currentNumberOfMailItems + 1)})

          return 0
        })
        .catch(function(error) {
          console.log(JSON.stringify(error));
        });
    }

    return 0;
})