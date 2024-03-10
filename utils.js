function isLoggingEnabled() {
    return process.env.SEWF_LOGGING_ENABLE === "TRUE";
}

function logger(message, type = "log") {
    const types = ["log", "warn", "error"];
    if (!types.includes(type)) {
        type = "log";
    }
    if (!isLoggingEnabled()) {
        return;
    }
    console[type](message);
}

module.exports = logger;
