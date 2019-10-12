const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ListSchema = new Schema({
    user_id: { type: String, required: true },
    List_name: { type: String, required: true },
    Cards_id: { type: Array, required: true }
});


// Export the model
module.exports = mongoose.model('List', ListSchema);

