# Progressive web app example
Exploring new and some not so new features of browser

## Features
- service-worker
- caching
- push notifications
- camera usage
- background-sync
- firebase functions

## Setup and run
1. Add firebase constants (firebase Project ID and firebase cloud functions plublic url) in /public/src/js/config.js and /functions/config.js
2. Make in /functions/ make two files: pwagram-fb-key.json and pwagram-vapid-key.json, first containing firebase private key and second one containing vapid key (https://github.com/web-push-libs/web-push)
3. In /functions/ folder run `npm install` and than `npm run deploy` to deploy firebase functions
4. In root folder run `npm install`
5. From same folder run `npm run build` and after that `npm start`
