const express = require('express');
const path = require('path');
const app = express();
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/random', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: num })
})

app.get('/images', (req, res) => {
    const images = [
        'https://images.unsplash.com/photo-1662618113675-c7aed7142ccf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1662589537825-892db53c0556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1659535979248-bf5954d21328?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1662304996989-a81a2c7c798d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1662598986575-966052978153?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1662584999097-f4919ab9de2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1661961111247-e218f67d1cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw1Nnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60'
    ];

    res.render('images', { images })
})

app.get('/r/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit });
    }
})

app.listen(8080, () => {
    console.log('Listening!');
})