const config = {
    "sentry_dns": process.env.SENTRY_DNS,
    "db_url": process.env.DATABASE_URL,
    "env": process.env.ENV,
    "app_port": process.env.PORT || 8000
}

module.exports = config;
