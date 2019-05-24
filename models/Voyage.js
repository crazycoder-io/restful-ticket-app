import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const voyageSchema = new Schema({
    trainId: String,
    departure: String,
    arrival: String,
    platform: String,
    voyage: {type: Boolean, default: false },
    date: Date
});

module.exports = mongoose.model("Voyages", voyageSchema);