const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const pannelSchema = new Schema({
    BOUSSKOURA: Number,
    MARRAKECH: Number,
    TANGER: Number,
    AGADIR: Number,
    ZARKTOUNI: Number,
    DARBOUAZA: Number,
    TEMARA: Number,
    MEKNES: Number,
    SOUKRATE: Number,
    DATE: String
});

// Create a model based on that schema
const Pannel = mongoose.model("Pannel", pannelSchema);

// export the model
module.exports = Pannel;
