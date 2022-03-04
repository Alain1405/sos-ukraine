const { db } = require("./models/index")
const config = require('config');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

async function connectDb() {
    try {
        await db.sequelize.sync();
        await db.sequelize.authenticate();
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
        environment: config.get('env'),
    });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
}

const requestStatuses = {
    "default": {id: "default", value: "Open"},
    "in_progress": {id: "in_progress", value: "In Progress"},
    "open": {id: "open", value: "Open"},
    "closed": {id: "closed", value: "Closed"}
}

module.exports = { connectDb, initSentry, requestStatuses }
