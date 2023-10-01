const { model, Schema } = require("mongoose");
const bcrypt = require('bcrypt'); // For password hashing
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default:"user",
    },
    status: {
        type: String,
        enum: ["pending", "approved",'declined','blocked'],
        default:"pending",
      },
    subscriptionStatus:{
        type: String,
        enum: ['free tier', 'premium tier'],
        default:"free tier",
    }
  },
  {
    timestamps: true,
    id:true,
  }
);

// Pre-hook to hash the password before saving it
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
      return next(); // Skip hashing if password hasn't changed
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  // Custom method to compare passwords
  UserSchema.methods.comparePassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password);
    } catch (error) {
      throw error;
    }
  };
  

const User=model("User",UserSchema);

module.exports =User
