const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First'
}, {
    _id: new ObjectID(),
    text: 'Second',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
   Todo.deleteMany({}).then(() => {
       return Todo.insertMany(todos);
   }).then(() => done());
});

describe('POST /todos', () => {
   it('should create a new todo', (done) => {
       let text = 'Test todo text';

       request(app)
           .post('/todos')
           .send({text})
           .expect(200)
           .expect((res) => {
               expect(res.body.text).toBe(text);
           })
           .end((err, res) => {
               if (err) {
                   return done(err);
               }

               Todo.find({text}).then((todos) => {
                   expect(todos.length).toBe(1);
                   expect(todos[0].text).toBe(text);
                   done();
               }).catch((e) => done(e));
           });
   });

    it('should not create todo with invalid body data', function (done) {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', function () {
    it('should return todo doc', function (done) {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return 404 if todo not found', function (done) {
        const id = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', function (done) {
        request(app)
            .get(`/todos/123abc`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', function () {
    it('should remove a todo', (done) => {
        const id = todos[1]._id.toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(id);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.findById(id).then((todo) => {
                    expect(todo).toNotExist();
                    done();
                }).catch((e) => done(e));
            })
    });

    it('should return 404 if todo not found', (done) => {
        const id = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${id}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/123abc`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', function () {
    it('should updated the todo', function (done) {
        const id = todos[0]._id.toHexString();
        const todo = {
            text: 'Tests',
            completed: true
        };

        request(app)
            .patch(`/todos/${id}`)
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todo.text);
                expect(res.body.todo.completed).toBe(true);
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when to do is not completed', function (done) {
        const id = todos[1]._id.toHexString();
        const todo = {
            text: 'Tests1',
            completed: false
        };

        request(app)
            .patch(`/todos/${id}`)
            .send(todo)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todo.text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toNotExist();
            })
            .end(done);
    });
});