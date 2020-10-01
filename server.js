const express = require('express');
const path = require('path');
const app = express();
const porta = process.env.PORT || 4200;

app.use(express.static(__dirname + '/dist/tccWorkerFrontEnd'));

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/tccWorkerFrontEnd/index.html');
});

app.listen(porta);
console.log("Run APP Express");