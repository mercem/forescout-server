"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var posts = require('../data/posts.json');
var app = express();
var port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', function (req, res) { return res.send('Forescout Blog API'); });
app.get('/posts', function (req, res) { return res.send(posts); });
app.get('/posts/:id', function (req, res) {
    if (!posts[req.params.id])
        res.status(404).send('Incorrect ID or post has been deleted already.');
    else
        res.send(posts[req.params.id]);
});
app.post('/posts', function (req, res) {
    var _a = req.body, title = _a.title, datePosted = _a.datePosted, categories = _a.categories, content = _a.content;
    if (title && datePosted && categories && categories.length !== 0 && content) {
        posts.push({ title: title, datePosted: datePosted, categories: categories, content: content });
        res.send('Successfully added.');
    }
    else
        res.status(400).send('Incorrect post data');
});
app.delete('/posts/:id', function (req, res) {
    if (!posts[req.params.id])
        res.status(404).send('Incorrect ID or post has been deleted already.');
    else {
        posts.splice(req.params.id, 1);
        res.send('Successfully deleted.');
    }
});
app.listen(port, function () { return console.log("Listening on port " + port + "!"); });
