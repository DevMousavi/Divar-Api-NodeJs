import mongoose from 'mongoose';

const MONGODB_URL = 'mongodb://localhost:27017/';
const MONGODB_NAME = 'a';

mongoose
    .connect(MONGODB_URL + MONGODB_NAME, {})
    .then(() => {
        console.log('Connect to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });
