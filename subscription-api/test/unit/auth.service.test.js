const authService = require("../../src/services/auth.service");
const userRepository = require("../../src/repositories/user.repository");
const passwordUtils = require("../../src/utils/password");
const jwtUtils = require("../../src/utils/jwt");

jest.mock("../../src/repositories/user.repository");
jest.mock("../../src/utils/password");
jest.mock("../../src/utils/jwt");

describe("Auth Service - Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("register()", () => {
    test("Harus sukses mendaftarkan user baru dan me-return data user (tanpa password)", async () => {
      const registerDto = {
        email: "newuser@example.com",
        password: "password123",
        name: "New User",
      };

      const hashedPassword = "hashed_password123";
      const createdUser = {
        id: "user-uuid-123",
        email: registerDto.email,
        name: registerDto.name,
        role: "user",
        created_at: new Date(),
      };

      userRepository.findUserByEmail.mockResolvedValue(null);
      passwordUtils.hashPassword.mockResolvedValue(hashedPassword);
      userRepository.createUser.mockResolvedValue(createdUser);

      const result = await authService.register(registerDto);

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(passwordUtils.hashPassword).toHaveBeenCalledWith(registerDto.password);
      expect(userRepository.createUser).toHaveBeenCalledWith({
        ...registerDto,
        password: hashedPassword,
      });
      expect(result).toEqual(createdUser);
    });

    test("Harus melempar error jika email sudah terdaftar (duplicate email case)", async () => {
      const registerDto = {
        email: "existing@example.com",
        password: "password123",
        name: "Existing User",
      };

      userRepository.findUserByEmail.mockResolvedValue({
        id: "user-1",
        email: registerDto.email,
      });

      await expect(authService.register(registerDto)).rejects.toThrow("Email already in use");

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(registerDto.email);
      expect(passwordUtils.hashPassword).not.toHaveBeenCalled();
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe("login()", () => {
    test("Harus sukses login dan mengembalikan token jika kredensial benar", async () => {
      const loginDto = {
        email: "user@example.com",
        password: "password123",
      };

      const mockUser = {
        id: "user-123",
        email: loginDto.email,
        password: "hashed_password_db",
        role: "user",
      };

      const mockToken = "mocked_jwt_token";

      userRepository.findUserByEmail.mockResolvedValue(mockUser);
      passwordUtils.comparePassword.mockResolvedValue(true);
      jwtUtils.signJWT.mockReturnValue(mockToken);

      const result = await authService.login(loginDto);

      expect(userRepository.findUserByEmail).toHaveBeenCalledWith(loginDto.email);
      expect(passwordUtils.comparePassword).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password
      );
      expect(result).toEqual({
        token: mockToken,
        user: {
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role,
        },
      });
    });

    test("Harus melempar error jika user tidak ditemukan", async () => {
      const loginDto = {
        email: "notfound@example.com",
        password: "password123",
      };

      userRepository.findUserByEmail.mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow("Invalid email or password");

      expect(passwordUtils.comparePassword).not.toHaveBeenCalled();
    });

    test("Harus melempar error jika password salah (wrong password case)", async () => {
      const loginDto = {
        email: "user@example.com",
        password: "wrongpassword",
      };

      const mockUser = {
        id: "user-123",
        email: loginDto.email,
        password: "correct_hashed_password",
      };

      userRepository.findUserByEmail.mockResolvedValue(mockUser);
      passwordUtils.comparePassword.mockResolvedValue(false);

      await expect(authService.login(loginDto)).rejects.toThrow("Invalid email or password");

      expect(passwordUtils.comparePassword).toHaveBeenCalledWith(
        loginDto.password,
        mockUser.password
      );
      expect(jwtUtils.signJWT).not.toHaveBeenCalled();
    });
  });
});