const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');

const app = express();
let port = process.env.PORT || 3000;

mongoose.connect('mongodb://mongo:27017/books', {useNewUrlParser: true, useUnifiedTopology: true});

router(app);

app.listen(port, () => console.log(`API Served off port: ${port}`));