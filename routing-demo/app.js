const express = require('express');
const path = require('path');
const apiRouter = require('./routes/apiRouter');
const apiVersion1 = require('./routes/api1');
const apiVersion2 = require('./routes/api2');

const app = express();

const staticPath = path.resolve(__dirname, "static");
app.use(express.static(staticPath));

// apiRouter is used just like middleware
app.use('/api', apiRouter);
app.use('/v1', apiVersion1);
app.use('/v2', apiVersion2);

app.listen(4200, () => {
    console.log('Listening at ' + 'http://localhost:4200');
})