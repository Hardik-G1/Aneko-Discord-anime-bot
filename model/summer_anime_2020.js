var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: [{
        type: String,
        required: true
    }],
    date: { type: String },
    source: { type: String },
    episodes: { type: String },
    gener: [{ type: String }],
    studio: { type: String },
    link: { type: String },
    synop: { type: String },
    rating: { type: Number },
    anime_id: { type: String, unique: true, required: true },
    time: { type: Number }
});
module.exports = mongoose.model("summer_anime_2020", userSchema);