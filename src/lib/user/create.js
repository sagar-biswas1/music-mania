const User = require("../../models/User");

const create = async ({ name, email, password,role,status }) => {
  
  if (!email || !password || !name||!role||!status) {
  
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }

  const user = new User({
    name,
    email,
    password,
    role,
    status,
  });

  await user.save();

  // Exclude the password field from the returned user object
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return userWithoutPassword;
};
module.exports = create;
