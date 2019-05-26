import mongoose from 'mongoose';

module.exports = () => {
    mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});
    mongoose.set('useCreateIndex', true);

    mongoose.connection.on('open', () => {
        //Connection is successful
        console.log('MongoDB Connection is Successful');
    });
    mongoose.connection.on('error', err => {
        //Connection is unsuccessful
        console.log('MongoDB Error: ', err);
    });

    mongoose.Promise = global.Promise;
};