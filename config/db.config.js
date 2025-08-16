const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI ;

mongoose.connect(MONGODB_URI)
.then((x) => console.info(`Connected to: ${x.connections[0].name}`))
.catch((error) => {
  console.error('Error connecting to mongo', error);
  process.exit(0);
});

process.on('SIGINT', () => {
  mongoose.connection(() => {
    console.info(`Connection will close`);
    process.exit(0);
  });
});
  