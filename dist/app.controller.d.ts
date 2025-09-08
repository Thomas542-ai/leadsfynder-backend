export declare class AppController {
    getRoot(): {
        message: string;
        version: string;
        status: string;
        timestamp: string;
        endpoints: {
            health: string;
            auth: string;
            leads: string;
            campaigns: string;
            analytics: string;
            docs: string;
        };
        documentation: string;
    };
}
