const {SHA256} = require('crypto-js');
const bcrypt = require('bcryptjs');

// const message = 'I am use number 3';
// const hash = SHA256(message).toString();
//
// console.log('Message', message);
// console.log('Hash', hash);
//
// const data = {
//   id: 4
// };
//
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed. Do not trust');
//
// }
//
// const jwt = require('jsonwebtoken');
//
// const newData = {
//     id: 10
// };
//
// const newToken = jwt.sign(newData, '123abc');
//
// console.log(newToken);
//
// const decoded = jwt.verify(newToken, '123abc');
//
// console.log('decoded', decoded);

const password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//        console.log(hash);
//     });
// });

const hashedPassword = '$2a$10$MAWdq2Fw95xgH5ysX7LOZOj8HCjPqJ2SDJMMKIsHV.bjq8UWCCXXq';
bcrypt.compare(password, hashedPassword, (err, res) => {
   console.log(res);
});