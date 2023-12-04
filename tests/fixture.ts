import { test as base } from '@playwright/test';
import { SetupServer, setupServer } from 'msw/node';

export const test = base.extend<{ startMockedServer: () => Promise<SetupServer> }>({
    startMockedServer: async ({ }, use) => {
        use(async () => {
            const mockServer = setupServer();
            mockServer.listen();

            mockServer.events.on('request:start', ({ request }) => console.log('🎭✅ intercepted request:', request.method, request.url));
            mockServer.events.on('request:unhandled', ({ request }) => console.log('🎭❌ unhandled request:', request.method, request.url));
            console.log('🎭 mock server started');

            await import('../server.mjs');
            console.log('💿 remix server started');

            return mockServer;
        })
    },
});