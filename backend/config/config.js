const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 9000,
    dbURL: process.env.DATABASE_URL,
    privetKey: process.env.PRIVATE_KEY,
  },
  production: {},
};
config / config.js;
module.exports = config[env];