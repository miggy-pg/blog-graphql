const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { 
      type: String, 
      trim: true 
    },
    content: { 
      type: String, 
      trim: true 
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// PostSchema.statics.like = function(id) {
//   const Lyric = mongoose.model('lyric');

//   return Lyric.findById(id)
//     .then(lyric => {
//       ++lyric.likes;
//       return lyric.save();
//     })
// }

const Post = mongoose.model('Post', PostSchema);

module.exports = Post
