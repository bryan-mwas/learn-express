const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const SALT_FACTOR = 10;

const noop = () => {};

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  displayName: String,
  bio: String,
});

userSchema.pre("save", function (done) {

  const user = this;

  if (!user.isModified("password")) {
    return done;
  }

  bcrypt.genSalt(SALT_FACTOR, function (error, salt) {
    if (error) {
      return done(error);
    }
    bcrypt.hash(user.password, salt, noop, function (error, hashedPassword) {
      if (error) {
        return done(error);
      }
      user.password = hashedPassword;
      done();
    });
  });

});

userSchema.methods.name = function () {
  return this.displayName || this.username;
};

userSchema.methods.checkPassword = function (guess, done) {
  bcrypt.compare(guess, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
