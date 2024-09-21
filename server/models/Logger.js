class Logger {
    constructor() {
    }

    log(message, tag = "ezcrm") {
        console.log(tag, ":", message)
    }

    error(message, tag = "ezcrm") {
        console.log(tag, ":", message)
    }
}

module.exports = new Logger();