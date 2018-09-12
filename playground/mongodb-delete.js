// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected');

    const db = client.db('TodoApp');

    db.collection('Users').deleteMany({name: {$ne: 'Wojtek'}}).then((result) => {
        console.log(result);
    });

    // db.collection('Todos').deleteOne({text: 'Eat'}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Todos').findOneAndDelete({text: 'Eat'}).then((result) => {
    //     console.log(result);
    // });
});