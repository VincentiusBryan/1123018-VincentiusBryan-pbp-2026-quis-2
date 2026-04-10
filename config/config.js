require('dotenv').config();

module.exports = {
    "development": {
        username: "postgres",
        password: "bryan123",
        database: "pbp-quis2", 
        host: "127.0.0.1",
        port: 5432,
        dialect: "postgres"
    }
}