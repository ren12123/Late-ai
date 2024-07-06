import { load } from 'cheerio';
import { decode } from 'iconv-lite';

export const novelQuery = {
<<<<<<< HEAD
  scrape: async (novelUrl: string): Promise<{ html: string; title: string; author: string }> => {
=======
  scrape: async (
    novelUrl: string,
  ): Promise<{
    html: string;
    title: string;
    author: string;
  }> => {
>>>>>>> other-repo/develop
    const data = await fetch(novelUrl).then((b) => b.arrayBuffer());
    const html = decode(Buffer.from(data), 'Shift_JIS');
    const $ = load(html);
    const title = $('.title').text();
    const author = $('.author').text();
    return { html, title, author };
  },
};
