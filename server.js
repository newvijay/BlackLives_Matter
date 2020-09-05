require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();

require('./config/database');

const userRouter = require('./routes/users');
const blackliveRouter = require('./routes/blacklives')
const commentRouter = require('./routes/comments')
const likeRouter = require('./routes/likes')

const cors = require(('cors'))


app.use(express.static(path.join(__dirname, "./public/")));


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api/blacklives', blackliveRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);
app.use('/api/users', userRouter);




app.listen(port, () => {
    console.log(`Express is listening on ${port}.`)
})
