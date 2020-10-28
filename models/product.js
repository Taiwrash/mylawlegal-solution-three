const mongoose = require("mongoose");

const produceSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  image: Array,
  description: String,
  price: String,
});

console.log(produceSchema);

module.exports = mongoose.model("Produce", produceSchema);
