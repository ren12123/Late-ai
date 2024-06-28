import { expect, test } from 'vitest';
import { noCookieClient } from './apiClient';
import { GET, POST } from './utils';

test(GET(noCookieClient), async () => {
  const res = await noCookieClient.novel.$get();

  expect(res).toEqual('');
});

test(POST(noCookieClient.novel), async () => {
  const aozoraUrl = 'abc';
  const res = await noCookieClient.novel.post({ body: { aozoraUrl } });
  expect(res).toEqual(aozoraUrl);
});
