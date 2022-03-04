module.exports = {
    "sentry_dns": process.env.SENTRY_DNS,
    "db": {
        "url": process.env.DATABASE_URL,
        "options": {}
    },
    "env": process.env.ENV,
    "app_port": process.env.PORT || 8000,
    "auth": {
        "user": process.env.AUTH_USER,
        "password": process.env.AUTH_PASSWORD,
        "secret": process.env.SECRET
    }
};