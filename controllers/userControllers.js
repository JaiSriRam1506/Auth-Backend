const { UserServices } = require("../services");

async function register(req, res) {
  try {
    //Code Logic

    const response = await UserServices.register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
  } catch (error) {}
}

module.exports = {
  register,
};
