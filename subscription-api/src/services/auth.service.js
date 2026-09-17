const jwtUtils = require("../utils/jwt");
const passwordUtils = require("../utils/password");
const userRepository = require("../repositories/user.repository");
const BadRequestError = require("../errors/BadRequestError");
const UnauthorizedError = require("../errors/UnauthorizedError");

async function register(userData) {
  const { email, password, name } = userData;

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new BadRequestError("Email already in use");
  }

  const hashedPassword = await passwordUtils.hashPassword(password);

  const user = await userRepository.createUser({
    email,
    password: hashedPassword,
    name,
  });

  return user;
}

async function login(loginData) {
  const { email, password } = loginData;

  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const isMatch = await passwordUtils.comparePassword(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const token = jwtUtils.signJWT({ id: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

module.exports = {
  register,
  login,
};
