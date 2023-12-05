import { test as base } from '@playwright/test';
import { SetupServer, setupServer } from 'msw/node';

export const test = base.extend<{ mockServer: SetupServer }, { port: number }>({
    port: [
        async ({ }, use, workerInfo) => {
            use(3000 + workerInfo.workerIndex)
        },
        {
            scope: 'worker'
        }
    ],
    baseURL: async ({ port }, use) => {
        await use(`http://localhost:${port}/`);
    },
    mockServer: async ({ port }, use) => {
        const mockServer = setupServer();
        mockServer.listen();

        mockServer.events.on('request:start', ({ request }) => console.log('🎭✅ intercepted request:', request.method, request.url));
        mockServer.events.on('request:unhandled', ({ request }) => console.log('🎭❌ unhandled request:', request.method, request.url));
        console.log('🎭 mock server started');

        const { startServer } = await import('../test-server.mjs');
        const server = await startServer(port)
        console.log(`💿 remix server started`);

        await use(mockServer);

        server.close();
        mockServer.close();
    },
});
