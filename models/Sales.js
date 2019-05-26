import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const salesSchema = new Schema({
    ticketId: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    passengerId: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    seat: {
        type: Number,
        required: [true, '`{PATH}` field is required!']
    },
    carriage: {
        type: Number,
        required: [true, '`{PATH}` field is required!']
    },
    classType: {
        type: Number,
        required: [true, '`{PATH}` field is required!']
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Sales", salesSchema);