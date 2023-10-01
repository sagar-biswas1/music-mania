const User = require("../../models/User");

const create = async ({ name, email, password }) => {
  if (!email || !password || !name) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }

  const user = new User({
    name,
    email,
    password,
    role: "user",
    status: "pending",
    subscriptionStatus: "free tier",
  });

  await user.save();

  // Exclude the password field from the returned user object
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return userWithoutPassword;
};
module.exports = create;
