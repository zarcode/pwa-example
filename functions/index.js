
var functions = require('firebase-functions');
var admin = require('firebase-admin');
var cors = require('cors')({origin: true});
var webpush = require('web-push');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

var serviceAccount = require("./pwagram-fb-key.json");
var privateVapidKey = require("./pwagram-vapid-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://pwagram-3ce94.firebaseio.com/'
});

exports.storePostData = functions.https.onRequest(function(request, response) {
    cors(request, response, function() {
        admin.database().ref('posts').push({
            id: request.body.id,
            title: request.body.title,
            location: request.body.location,
            image: request.body.image
        })
            .then(function() {
                webpush.setVapidDetails(
                    'mailto:denciczarko@gmail.com',
                    'BLve4x4CextokbUexlU-RIPo8Bvb9SuhsnCKoaRkiIfqZmybkYybX0Lwn95NVDzVaMiijufGBmm6qI_21GDOMM4',
                    privateVapidKey.key
                );
                return admin.database().ref('subscriptions').once('value');
            })
            .then(function (value) {
                value.forEach(function (sub) {
                    var pushConfig = {
                        endpoint: sub.val().endpoint,
                        keys: {
                            auth: sub.val().keys.auth,
                            p256dh: sub.val().keys.p256dh
                        }
                    };
                    webpush.sendNotification(pushConfig, JSON.stringify({
                        title: "New Post",
                        content: "Added"
                    }))
                        .catch(function (err) {
                            console.log(err)
                        })
                });
                response.status(201).json({message: 'Data stored', id: request.body.id})
            })
            .catch(function(err) {
                response.status(500).json({error: err});
            });
    });
});
