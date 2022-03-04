const { sequelize } = require("./models")
const config = require('config');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

async function connectDb() {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

function initSentry(app) {
    Sentry.init({
        dsn: config.get('sentry_dns'),
        integrations: [
            // enable HTTP calls tracing
            new Sentry.Integrations.Http({ tracing: true }),
            // enable Express.js middleware tracing
            new Tracing.Integrations.Express({ app }),
        ],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
}
module.exports = { connectDb, initSentry }
