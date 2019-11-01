var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Topic = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String
    },
    filename: {
      type: String
    }
  },
  {
    timestamps: true
  },
  {
    collection: "topics"
  }
);

module.exports = mongoose.model("Topic", Topic);
