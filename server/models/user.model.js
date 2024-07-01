const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  username: { 
    type: String, 
    required: true, 
    index: {unique: true} 
  },
  email: { 
    type: String, 
    required: true, 
    index: {unique: true} 
  },
  password: { 
    type: String, 
    required: true 
  },
});

// UserSchema.statics.addLyric = function(id, content) {
//   const Lyric = mongoose.model('lyric');

//   return this.findById(id)
//     .then(song => {
//       const lyric = new Lyric({ content, song })
//       song.lyrics.push(lyric)
//       return Promise.all([lyric.save(), song.save()])
//         .then(([lyric, song]) => song);
//     });
// }

// UserSchema.statics.findLyrics = function(id) {
//   return this.findById(id)
//     .populate('lyrics')
//     .then(song => song.lyrics);
// }

const User = mongoose.model('User', UserSchema);

module.exports = User
