const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '5c1abe1484d0c71483a48c6f11';
//
// if (!ObjectID.isValid(id)) {
//     console.log('Id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });
//
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found');
//     }
//
//     console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

const id = '5ba937895bea26b94f14579a';

if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

User.findById(id).then((user) => {
    if (!user) {
        return console.log('User not found');
    }

    console.log(user);
}).catch((e) => console.log(e));
