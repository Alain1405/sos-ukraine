const { options } = require('pg/lib/defaults');

var defer = require('config/defer').deferConfig;


module.exports = {
    "sentry_dns": process.env.SENTRY_DNS,
    "db": {
        "url": process.env.DATABASE_URL,
        "options": defer(function() {
            var options = {}
            if (this.env != 'DEV') {
                options.dialectOptions = {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                }
            };
            return options;
        })
    },
    "env": process.env.ENV,
    "app_port": process.env.PORT || 8000
};