const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: 'post'
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    content: { type: String },
  },
  { timestamps: true}
);

// CommentSchema.statics.like = function(id) {
//   const Lyric = mongoose.model('lyric');

//   return Lyric.findById(id)
//     .then(lyric => {
//       ++lyric.likes;
//       return lyric.save();
//     })
// }

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment
