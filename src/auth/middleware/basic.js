'use strict';

//authentication for the sign in user new account

//initialization and setup the app and package
//base-64
const base64 = require('base-64');

module.exports = (request, response, next) => {
    /*
    req.headers.authorization is : "Basic sdkjdsljd="
    To get username and password from this, take the following steps:
      - Turn that string into an array by splitting on ' '
      - Pop off the last value
      - Decode that encoded string so it returns to user:pass
      - Split on ':' to turn it into an array
      - Pull username and password from that array
  */

    let basicHeaderParts = req.headers.authorization.split(' '); // ['Basic', 'sdkjdsljd=']
    let encodedString = basicHeaderParts.pop(); // sdkjdsljd=
    let decodedString = base64.decode(encodedString); // "username:password"
    let [username, password] = decodedString.split(':'); // username, password

    if (username && password) {
        request.user = { username, password };
        next();
    } else {
        next('invalid sign in');
    }
};