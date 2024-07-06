import type { LodingWorkEntity } from 'api/@types/work';
import assert from 'assert';
import type { ChatCompletion, ImagesResponse } from 'openai/resources';
import { OPENAI_MODEL } from 'service/envValues';
import { openai } from 'service/openai';
import { workUseCase } from '../useCase/workUseCase';

const createChatPrompt = (
  loadingWork: LodingWorkEntity,
  html: string,
): string => `以下は"${loadingWork.author}"が書いた"${loadingWork.title}"という小説の内容です。
サムネイルを作成するため、Dall-E 3のプロンプトを作成してください。
トリミングせず全面に1枚の絵をDall-E 3に描画させてください。
出力した結果をそのままDall-E 3に渡すため、余計なテキストを含めず目的のプロンプトのみ生成してください。
==============
${html}`;

const sendChat = async (
  lodingWork: LodingWorkEntity,
  html: string,
): Promise<{ chatPrompt: string; imagePrompt: string; res: ChatCompletion }> => {
  const chatPrompt = createChatPrompt(lodingWork, html);
  const res = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    temperature: 0,
    messages: [
      { role: 'system', content: 'あなたは小説の編集者です' },
      { role: 'user', content: chatPrompt },
    ],
  });

  const imagePrompt = res.choices[0].message.content;
  assert(imagePrompt);
  return { chatPrompt, imagePrompt, res };
};

export const genImage = async (prompt: string): Promise<{ image: Buffer; res: ImagesResponse }> => {
  const res = await openai.images.generate({
    model: 'dall-e-3',
    prompt,
    size: '1792x1024',
    response_format: 'b64_json',
  });
  const { b64_json } = res.data[0];
  const arrayBuffer = await fetch(`data:image/png;base64,${b64_json}`).then((b) => b.arrayBuffer());
  return { image: Buffer.from(arrayBuffer), res };
};
export const workEvent = {
  workCreated: (params: { lodingWork: LodingWorkEntity; html: string }): void => {
    // const chatPrompt = createChatPrompt(params.lodingWork, params.html);
    // openai.chat.completions
    //   .create({
    //     model: OPENAI_MODEL,
    //     temperature: 0,
    //     messages: [
    //       { role: 'system', content: 'あなたは小説の編集者です' },
    //       { role: 'user', content: chatPrompt },
    //     ],
    //   })
    //   .then(async (response) => {
    //     const imagePrompt = response.choices[0].message.content;
    //     assert(imagePrompt);
    //     const image = await genImage(imagePrompt);
    //     await workUseCase.complete(params.lodingWork, image);
    //   });
    sendChat(params.lodingWork, params.html)
      .then(async ({ imagePrompt }) => {
        const { image } = await genImage(imagePrompt);
        await workUseCase.complete(params.lodingWork, image);
      })
      .catch((e) => workUseCase.failuer(params.lodingWork, e.message));
  },
};
