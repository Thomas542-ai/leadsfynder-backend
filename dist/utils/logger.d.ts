export declare class Logger {
    private context;
    constructor(context: string);
    log(message: string): void;
    error(message: string, error?: any): void;
    warn(message: string): void;
    debug(message: string): void;
}
