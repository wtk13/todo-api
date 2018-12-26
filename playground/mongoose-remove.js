const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });



Todo.findByIdAndDelete('5c23ee4e64e9591da88fea20').then((todo) => {
    console.log(todo);
});