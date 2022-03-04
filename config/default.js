const config = {
    "sentry_dns": process.env.SENTRY_DNS,
    "db": {
        "url": process.env.DATABASE_URL,
        "options": {}
    },
    "env": process.env.ENV,
    "app_port": process.env.PORT || 8000
};

if (config.env != 'DEV') {
    config.db.options.dialectOptions = {
        ssl: {
            require: config.get('env') != 'DEV',
            rejectUnauthorized: false
        }
    }
};

module.exports = {config};