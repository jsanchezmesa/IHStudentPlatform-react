const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  address: String,
  location: {
    type: { type: String },
    coordinates: [Number]
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  imagePath: { type: String }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;