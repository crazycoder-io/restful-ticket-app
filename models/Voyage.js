import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const voyageSchema = new Schema({
    trainId: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    departure: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    arrival: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    platform: {
        type: String,
        required: [true, '`{PATH}` field is required!']
    },
    voyage: {type: Boolean, default: false },
    date: {
        type: Date,
        required: [true, '`{PATH}` field is required!']
    }
});

module.exports = mongoose.model("Voyages", voyageSchema);