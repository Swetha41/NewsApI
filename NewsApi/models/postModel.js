const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Schema = mongoose.Schema;


const postSchema = new Schema ({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
  });

  var Post = mongoose.model('Post', postSchema);
  module.exports = Post;