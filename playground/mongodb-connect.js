// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
//     if (err) {
//         return console.log('Unable to connect to mongodb server');
//     }
//
//     console.log('Connected');
//
//     const db = client.db('TodoApp');
//
//     db.collection('Users').insertOne({
//         name: 'Wojtek',
//         age: 29,
//         location: 'Warsaw'
//     }, (err, result) => {
//         if (err) {
//             return console.log('Unable to insert user', err);
//         }
//
//         console.log(JSON.stringify(result.ops, undefined, 2));
//     });
//
//     client.close();
// });