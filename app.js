'use strict'
const express = require('express');
const app = express();
const userRoutes = require('./routes/user/user_route');
const projectRoutes = require('./routes/public/project_route');
const path = require('path');
// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/', express.static('public', { redirect: false }));
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.resolve('public/index.html'));
})
module.exports = app;