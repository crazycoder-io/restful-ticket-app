import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const sellSchema = new Schema({
    ticketId: String,
    passengerId: String,
    date: Date
});

module.exports = mongoose.model("Sell", sellSchema);