const env = process.env.NODE_ENV || 'development';

const config = {
    development: {
        port: process.env.PORT || 9000,
        dbURL: "mongodb+srv://user:123123abc@softuni.dg6bv.mongodb.net/Project?retryWrites=true&w=majority",
        authCookieName: 'x-auth-token',
        privetKey: 'PROJECT-WORKSHOP-SOFTUNI'
    },
    production: {}
};
config/config.js
module.exports = config[env];