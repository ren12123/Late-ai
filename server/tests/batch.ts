import { createHash } from 'crypto';
import { genImage, sendChat } from 'domain/work/event/workEvent';
import { workMethod } from 'domain/work/model/workMethod';
import { novelQuery } from 'domain/work/repository/novelQuery';
import { writeFileSync } from 'fs';
import { basename, join } from 'path';

const main = async (): Promise<void> => {
  const novelUrl = '';
  const { html, title, author } = await novelQuery.scrape(novelUrl);
  const filePath = join(__dirname, 'www.aozora.gr.jp/files', basename(novelUrl));

  writeFileSync(filePath, html, 'utf8');
  const lodingWork = await workMethod.create({ novelUrl, title, author });
  const chatResult = await sendChat(lodingWork, html);
  const imageResult = await genImage(chatResult.imagePrompt);

  const chatHash = createHash('md5').update(chatResult.chatPrompt).digest('hex');
  const imagesHash = createHash('md5').update(chatResult.imagePrompt).digest('hex');

  const chatFilePath = join(__dirname, 'api.openai.com/chat', `${chatHash}.json`);
  const imagesFilePath = join(__dirname, 'api.openai.com/chat', `${imagesHash}.json`);

  writeFileSync(chatFilePath, JSON.stringify(chatResult.res), 'utf8');
  writeFileSync(imagesFilePath, JSON.stringify(imageResult.res), 'utf8');
};

main();
