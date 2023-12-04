import { expect } from '@playwright/test';
import { HttpResponse, http } from 'msw';
import { test } from './fixture';

test('fetch quote from external API', async ({ page, startMockedServer }) => {
  const server = await startMockedServer();

  console.log('👨‍🔬 mocking API request');
  server.use(
    http.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes', () => HttpResponse.json(['Hello World!']))
  );

  await page.goto('http://localhost:3000/');

  await expect(page.getByRole('blockquote')).toHaveText('Hello World!')
});
