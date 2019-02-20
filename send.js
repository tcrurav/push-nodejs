// Very good explained by https://www.youtube.com/watch?v=6uZ7Fw8AVlk

// Configuration file which includes example device token
// config.js is not included in github repo to avoid security problems
var myConfig = require('./config');
var config = myConfig.config;

var admin = require('firebase-admin');

// File with firebase admin sdk
// paralnd-firebase-adminsdk.json is not included in github repo to avoid security problems
var serviceAccount = require('./paralnd-firebase-adminsdk.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://paralnd-25cf6.firebaseio.com"
});

// Device token to identify the device to which the notification is sent
var registrationToken = config.registrationToken;
var payload = {
    notification: {
        title: 'Example title message',
        body: 'Example body message'
      },
    data: {
        MyKey1: "Hello"
    }
}

var options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
}

admin.messaging().sendToDevice(registrationToken, payload, options)
    .then(function(response){
        console.log("Successfully sent message:", response);
    })
    .catch(function(error){
        console.log("Error sending message:", error);
    });