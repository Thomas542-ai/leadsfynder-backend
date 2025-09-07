"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    constructor(context) {
        this.context = context;
    }
    log(message) {
        console.log(`[${this.context}] ${message}`);
    }
    error(message, error) {
        console.error(`[${this.context}] ${message}`, error);
    }
    warn(message) {
        console.warn(`[${this.context}] ${message}`);
    }
    debug(message) {
        console.debug(`[${this.context}] ${message}`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map