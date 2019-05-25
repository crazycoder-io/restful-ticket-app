import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    voyageId: String,
    firstClassTicketPrice: Number,
    secondClassTicketPrice: Number
});

module.exports = mongoose.model("Tickets", ticketSchema);