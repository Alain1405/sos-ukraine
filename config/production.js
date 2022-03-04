process.env.ALLOW_CONFIG_MUTATIONS = 'true';
module.exports = {
    "db": {
        "options": {
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        }
    }
};