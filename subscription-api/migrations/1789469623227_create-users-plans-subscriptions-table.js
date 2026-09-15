exports.shorthands = undefined;

exports.up = (pgm) => {
  // 1. Ekstensi untuk gen_random_uuid()
  pgm.createExtension("pgcrypto", { ifNotExists: true });

  // 2. Tabel Users
  pgm.createTable("users", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      primaryKey: true,
    },
    email: { type: "varchar(255)", notNull: true, unique: true },
    password: { type: "varchar(255)", notNull: true },
    name: { type: "varchar(255)" },
    role: { type: "varchar(50)", notNull: true, default: "user" },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // 3. Tabel Plans
  pgm.createTable("plans", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      primaryKey: true,
    },
    name: { type: "varchar(100)", notNull: true },
    price: { type: "decimal(10, 2)", notNull: true },
    duration_days: { type: "integer", notNull: true },
    is_active: { type: "boolean", notNull: true, default: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  // 4. Tabel Subscriptions
  pgm.createTable("subscriptions", {
    id: {
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
      primaryKey: true,
    },
    user_id: {
      type: "uuid",
      notNull: true,
      references: '"users"',
      onDelete: "CASCADE",
    },
    plan_id: {
      type: "uuid",
      notNull: true,
      references: '"plans"',
      onDelete: "RESTRICT",
    },
    status: { type: "varchar(20)", notNull: true, default: "ACTIVE" },
    start_date: { type: "timestamp", notNull: true },
    end_date: { type: "timestamp", notNull: true },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("subscriptions");
  pgm.dropTable("plans");
  pgm.dropTable("users");
};
