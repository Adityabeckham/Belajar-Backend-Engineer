const pool = require("../config/database");
const planRepository = require("../repositories/plan.repository");
const userRepository = require("../repositories/user.repository");
const subscriptionRepository = require("../repositories/subscription.repository");

const createSubscription = async ({ userId, planId }) => {
  // 1. Dapatkan client khusus dari Connection Pool
  const client = await pool.connect();

  try {
    // 2. Mulai transaksi SQL
    await client.query("BEGIN");

    // 3. Cek user dan plan yang valid
    const user = await userRepository.findUserById(userId);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    const plan = await planRepository.findPlanById(planId);
    if (!plan || !plan.is_active) {
      const err = new Error("Plan is not available");
      err.statusCode = 400;
      throw err;
    }

    // 4. Cek apakah user sudah punya paket yang aktif
    const activeSub = await subscriptionRepository.findActiveSubscriptionByUserId(userId, client);
    if (activeSub) {
      const err = new Error("User already has an active subscription");
      err.statusCode = 400;
      throw err;
    }

    // 5. Hitung tanggal mulai dan selesai
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration_days);

    // 6. Simpan subscription baru menggunakan client transaksi
    const subscription = await subscriptionRepository.createSubscriptionWithClient(client, {
      userId,
      planId,
      startDate,
      endDate,
    });

    // 7. Commit semua perubahan jika tidak ada error
    await client.query("COMMIT");

    return subscription;
  } catch (error) {
    // 8. Rollback seluruh transaksi jika terjadi kesalahan
    await client.query("ROLLBACK");
    throw error;
  } finally {
    // 9. Wajib melepaskan koneksi client kembali ke pool
    client.release();
  }
};

module.exports = {
  createSubscription,
};
