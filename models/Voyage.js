import mongoose from 'mongoose';

const voyageSchema = new Schema({
    trainId: String,
    departure: String,
    arrival: String,
    platform: String,
    voyage: Boolean,
    date: Date
});

module.exports = mongoose.model("Voyages", voyageSchema);