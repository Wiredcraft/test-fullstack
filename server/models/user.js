const mongoose = require('mongoose');
const cuid = require('cuid');
const crypto = require('crypto');
const sanitizeHtml = require('sanitize-html');
const securePassword = require('secure-password');
const pwd = securePassword();


const UserSchema = new mongoose.Schema({
  cuid         : { type: String, default: cuid(), required: true },
  name         : { type: String, required: true },
  password     : { type: String, required: true },
  token        : { type: String, required: false },
  polls        : { type: Array, default: [], required: true },
  date_created : { type: 'Date', default: (new Date().toISOString()), required: true },
  date_updated : { type: 'Date', default: (new Date().toISOString()), required: true }
}, { timestamps: true });

// Helper method to compare the passed password with the value in the database. A model method.
UserSchema.methods.comparePassword = function comparePassword(password, cb) {
  pwd.verify(Buffer.from(password), Buffer.from(this.password, 'base64'), function (err, result) {
    if (err) return cb(err);

    if (result === securePassword.INVALID_UNRECOGNIZED_HASH) return cb('This hash was not made with secure-password. Attempt legacy algorithm.');
    if (result === securePassword.INVALID) return cb('Given password incorrect.');

    if (result === securePassword.VALID_NEEDS_REHASH) {
      console.log('Password needs rehashing, wait for us to improve your safety');
      const improvedHash = pwd.hashSync(Buffer.from(password)).toString('base64');
      if (!improvedHash) {
        console.error('You are authenticated, but we could not improve your safety this time around');
      } else {
        console.error('Returning improved Hash.');
        this.password = improvedHash;
      }
      return cb(null, true);
    } else {
      return cb(null, true);
    }
  })
};


// The pre-save hook method
UserSchema.pre('save', function saveHook(next) {
  let user = this;

  if (!user.cuid) {
    user.cuid = cuid();
  };
  user.name = sanitizeHtml(user.name);
  user.date_updated = new Date().toISOString();

  // if the password is modified or the user is new
  const hash = pwd.hashSync(Buffer.from(user.password)).toString('base64');
  if (!!hash) user.password = hash;
  next();
});


module.exports = mongoose.model('User', UserSchema);
