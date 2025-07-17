const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  discordId: String,
  username: String,
  email: String,
  accessToken: String,
  verifiedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
