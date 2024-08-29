// config/db.js

const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/newdata'; // Replace with your actual connection string

const connectToMongo = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
};

module.exports = connectToMongo;
