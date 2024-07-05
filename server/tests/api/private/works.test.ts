import test from 'node:test';
import { expect } from 'vitest';
import { createUserClient, noCookieClient } from '../apiClient';
import { GET, POST } from '../utils';

test(GET(noCookieClient.private.works), async () => {
  const userClient = await createUserClient();
  const res = await userClient.private.works.$get();
  expect(res).Arguments.toHaveLength(0);
});

test(POST(noCookieClient.private.works), async () => {
  const userClient = await createUserClient();
  const novelUrl = 'aa';
  const res = await userClient.private.works.$post({
    body: { novelUrl },
  });
  expect(res.novelUrl).toBe(novelUrl);
  expect(res.title).toBe('rasyoumonn');
  expect(res.author).toBe('akutagawa');
});
