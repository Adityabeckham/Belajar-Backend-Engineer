const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/config/database");
const jwtUtils = require("../../src/utils/jwt");

jest.mock("../../src/config/database", () => ({
  query: jest.fn(),
  connect: jest.fn(),
}));

describe("Plans API Integration Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/v1/plans", () => {
    test("Harus mengembalikan daftar plans dengan status 200", async () => {
      const mockPlans = [
        { id: "1", name: "Basic Plan", price: 50000, duration_days: 30, is_active: true },
      ];

      pool.query.mockResolvedValueOnce({ rows: mockPlans });

      const response = await request(app)
        .get("/api/v1/plans")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.status).toBe("success");
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe("Basic Plan");
    });
  });

  describe("POST /api/v1/plans", () => {
    test("Harus mengembalikan 401 jika request tidak menyertakan Authorization token", async () => {
      await request(app).post("/api/v1/plans").send({ name: "Pro Plan" }).expect(401);
    });

    test("Harus mengembalikan 403 jika user yang login bukan admin", async () => {
      const userToken = jwtUtils.signJWT({ id: "user-1", role: "user" });

      await request(app)
        .post("/api/v1/plans")
        .set("Authorization", `Bearer ${userToken}`)
        .send({ name: "Pro Plan" })
        .expect(403);
    });

    test("Harus mengizinkan Admin membuat plan baru", async () => {
      const adminToken = jwtUtils.signJWT({ id: "admin-1", role: "admin" });
      const createdPlan = {
        id: "plan-123",
        name: "Enterprise Plan",
        price: 150000,
        duration_days: 30,
        is_active: true,
      };

      pool.query.mockResolvedValueOnce({ rows: [createdPlan] });

      const response = await request(app)
        .post("/api/v1/plans")
        .set("Authorization", `Bearer ${adminToken}`)
        .send({ name: "Enterprise Plan", price: 150000, duration_days: 30 })
        .expect(201);

      expect(response.body.status).toBe("success");
      expect(response.body.data.name).toBe("Enterprise Plan");
    });
  });
});