const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SettingSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    valueNum:Number,
    value:String
});

SettingSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    return this.collection.findAndModify(query, sort, doc, options, callback);
};

module.exports = mongoose.model("Setting", SettingSchema);