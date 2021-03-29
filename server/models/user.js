import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Hooks
userSchema.pre('save', next => {
  if (!this.isModified('password')) next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) next(error);
      this.password = hash;
      next();
    });
  });
});

// Methods
userSchema.methods.comparePassword = async enteredPassword => {
  const compared = await bcrypt.compare(enteredPassword, this.password);
  return compared;
};

const User = mongoose.model('users', userSchema);

export default User;
