const mongoose = require('mongoose');

mongoose.connect( 'mongodb+srv://testuser:testuser@cluster0-jomtw.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection;

db.on('connected', () => {
    console.log(`Mongoose connected to ${db.host}.`)
})

module.exports = mongoose;
