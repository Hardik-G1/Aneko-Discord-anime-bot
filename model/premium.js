var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    guild_id: { type: String, unique: true, required: true },
    name: [{ type: String }],
});
module.exports = mongoose.model("premium", userSchema);