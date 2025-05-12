import { initialize as initializeMappnextSdk } from '@mappnext/sdk';
import { OpenAPI as ClientOpenAPI } from '@mappnext/client';

console.log("Executing Mappnext SDK Initialization Module...");

try {
    const backendHost = process.env.BACKEND_HOST;

    if (!backendHost) {
        throw new Error("SDK Initialization Error: BACKEND_HOST environment variable is missing or empty.");
    }

    // Call the SDK's initialize function, passing BOTH config and the client's OpenAPI object
    initializeMappnextSdk(
        {
            baseUrl: backendHost,
            serverToken: process.env.MAPPNEXT_SERVER_TOKEN,
            withCredentials: false // Server-to-server often uses tokens, not cookies
        },
        ClientOpenAPI
    );

} catch (error) {
    console.error("❌ FATAL: Mappnext SDK Initialization Failed in Application:", error);
    // Consider how to handle failures - maybe prevent build or log prominently
    // process.exit(1); // Use with caution
}

// Optional export to ensure module import runs
export const sdkInitializationTriggered = true;
