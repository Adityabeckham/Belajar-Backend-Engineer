const jwtUtils = require("../utils/jwt");
const userRepository = require("../repositories/user.repository");
const passwordUtils = require("../utils/password");

const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Email and password are required",
      });
    }

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Email is already registered",
      });
    }

    const hashedPassword = await passwordUtils.hashPassword(password);
    const user = await userRepository.createUser({
      email,
      password: hashedPassword,
      name,
    });

    const token = jwtUtils.signJWT({ id: user.id, role: user.role });

    res.status(201).json({
      status: "success",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          created_at: user.created_at,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "Email and password are required",
      });
    }

    const user = await userRepository.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    const isMatch = await passwordUtils.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        statusCode: 401,
        message: "Invalid email or password",
      });
    }

    const token = jwtUtils.signJWT({ id: user.id, role: user.role });

    res.status(200).json({
      status: "success",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await userRepository.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  getMe,
};
