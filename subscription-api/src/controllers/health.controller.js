const getHealth = (req, res) => {
  res.status(200).json({
    status: "UP",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

const getReady = (req, res) => {
  // Readness check for server dependencies (DB, Redis, etc. to be expanded in future sprints)
  res.status(200).json({
    status: "READY",
    timestamp: new Date().toISOString(),
    checks: {
      server: "OK",
    },
  });
};

module.exports = {
  getHealth,
  getReady,
};
