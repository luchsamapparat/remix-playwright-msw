import { expect } from '@playwright/test';
import { HttpResponse, http } from 'msw';
import { test } from './fixture';

test('fetch quote from external API', async ({ page, mockServer }) => {
  console.log('👨‍🔬 mocking API request');
  mockServer.use(
    http.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes', () => HttpResponse.json(['Hello World!']))
  );

  await page.goto('/');

  await expect(page.getByRole('blockquote')).toHaveText('Hello World!')
});

test('fetch quote from external API #2', async ({ page, mockServer }) => {
  console.log('👨‍🔬 mocking API request');
  mockServer.use(
    http.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes', () => HttpResponse.json(['Hello Christoph!']))
  );

  await page.goto('/');

  await expect(page.getByRole('blockquote')).toHaveText('Hello Christoph!')
});
