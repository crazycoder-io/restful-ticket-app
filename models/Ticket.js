import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    voyageId: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    firstClassTicketPrice: {
        type: Number,
        required: [true, '`{PATH}` field is required!']
    },
    secondClassTicketPrice: {
        type: Number,
        required: [true, '`{PATH}` field is required!']
    }
});

module.exports = mongoose.model("Tickets", ticketSchema);