import mongoose from 'mongoose';

const sellSchema = new Schema({
    ticketId: String,
    passengerId: String,
    date: Date
});

module.exports = mongoose.model("Sell", sellSchema);