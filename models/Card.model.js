const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    user_id: { type: String, required: true },
    name: { type: String, required: true, max: 100 },
    unq_name:{type: String,required: true },
    profile_url: { type: String, required: true },
    why: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    public:{  type: Number, required: true  },
    lists:{ type: Array, required: true },
    domain: { type: String, required: true },
    sticker: { type: Array, required: true }
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);