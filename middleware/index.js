const express = require('express');
const http = require('http');
const logger = require('morgan');
const path = require('path');

const app = express();

// Middleware for logging the request
app.use(logger('dev'));

console.log('You are at DIRECTORY/FOLDER: ',__dirname);

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath))

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware for custom authentication
// allows req to complete if the minutes is divisible by two,
// if not, returns a 403, not authorized.
app.use((req, res, next) => {
    const minute = (new Date()).getMinutes();
    if ((minute % 2) === 0) {
        next();
    } else {
        res.statusCode = 403;
        res.end('Not authorized');
    }
});

// Routing
app.get('/', (req, res) => {
    res.render('index',{
        message: "Hey everyone! This is my webpage."
    });
});

app.get('/about', (req, res) => {
    res.end("Welcome to the about page!");
});

app.get('/weather', (req, res) => {
    res.end("Current weather is AWESOME!");
});

app.get('/hello/:who', (req, res) => {
    res.end(`Hello, ${req.params.who}.`)
})

// If other routes are traversed.
// the ordering of the middleware matters a lot,  
// if I placed this middleware before the above routes
// the response recieved would only be from this middleware.
app.use(function (req, res) {
    // res.writeHead(200, { "Content-Type": "text/plain" });
    res.statusCode = 404;
    res.redirect('/hello/there')
});

http.createServer(app).listen(4000);