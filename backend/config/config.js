const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    port: process.env.PORT || 9000,
    dbURL: process.env.DATABASE_URL,
    privetKey: process.env.PRIVATE_KEY,
    emailService: process.env.EMAIL_SERVICE,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    emailAdmin: process.env.EMAIL_ADMIN,
  },
  production: {},
};
config / config.js;
module.exports = config[env];
