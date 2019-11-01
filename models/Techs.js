var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define collection and schema for Items
var Techs = new Schema(
  {
    name: {
      type: String
    },
    topic: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    youtubelink: {
      type: String
    },
    officialdoc: {
      type: String
    },
    filename: {
      type: String
    },
    topicid: {
      type: Schema.Types.ObjectId,
      ref: "topics"
    }
  },
  {
    timestamps: true
  },
  {
    collection: "techs"
  }
);

module.exports = mongoose.model("Techs", Techs);
