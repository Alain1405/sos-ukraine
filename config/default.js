module.exports = {
    "sentry_dns": process.env.SENTRY_DNS,
    "db": {
        "url": process.env.DATABASE_URL,
        "options": {}
    },
    "env": process.env.ENV,
    "app_port": process.env.PORT || 8000
};