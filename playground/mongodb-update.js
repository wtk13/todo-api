// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongodb server');
    }

    console.log('Connected');

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b9d4da111693875fbe36265')
    // }, {
    //    $set: {
    //        completed: false
    //    }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        name: 'Wojtek'
    }, {
        $inc: {
            age: 2
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    client.close();
});