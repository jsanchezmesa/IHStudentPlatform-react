const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: String,
  user: {type: Schema.Types.ObjectId, ref:"User"},
  event: {type: Schema.Types.ObjectId, ref:"Event"}
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;