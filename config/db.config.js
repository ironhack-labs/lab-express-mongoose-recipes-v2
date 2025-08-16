const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.info('Successufully connected to the databse'))
    .catch((error) => {
        console.error('An error ocurred trying to connect to the database', error);
        process.exit(0);
    });

process.on('SIGINT', () => {
    mongoose.connect.close(() => {
        console.log('Databse connection closed');
        process.exit(0);
    })
});