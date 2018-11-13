const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventUserSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref:"User"},
  event: {type: Schema.Types.ObjectId, ref:"Event"}
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const EventUser = mongoose.model("EventUser", EventUserSchema);
module.exports = EventUser;