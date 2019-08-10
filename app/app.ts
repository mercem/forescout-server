import express = require('express');

let posts = require('../data/posts.json');

const app: express.Application = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('Forescout Blog API'));

app.get('/posts', (req, res) => res.send(posts));

app.get('/posts/:id', (req, res) => {
    if(!posts[req.params.id]) res.status(404).send('Incorrect ID or post has been deleted already.');
    else res.send(posts[req.params.id])
  }
);

app.post('/posts', (req, res) => {
  const {title, datePosted, categories, content} = req.body;
  if(title && datePosted && categories && categories.length !== 0 && content){
    posts.push({title, datePosted, categories, content});
    res.send('Successfully added.');
  } 
  else res.status(400).send('Incorrect post data'); 
})

app.delete('/posts/:id', (req, res) => {
  if(!posts[req.params.id]) res.status(404).send('Incorrect ID or post has been deleted already.');
  else {
    posts.splice(req.params.id, 1);
    res.send('Successfully deleted.');
  }
})

app.listen(port, () => console.log(`Listening on port ${port}!`));