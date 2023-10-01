const userService = require("../../../../lib/user");

const create = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await userService.create({ name, email, password });

    const response = {
      code: 201,
      message: "User created successfully.",
      user_data: {
        ...user,
      },
      links: {
        self: `/users/${user._id}`,
        edit: `/users/${user._id}`,
        delete: `/users/${user._id}`,
        view: `/users/${user._id}`,
      },
    };
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = create;
