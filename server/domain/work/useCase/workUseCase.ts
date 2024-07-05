import type { LodingWorkEntity } from 'api/@types/work';
import { transaction } from 'service/prismaClient';
import { workMethod } from '../model/workMethod';
import { novelQuery } from '../repository/novelQuery';
import { workCommand } from '../repository/workCommand';

export const workUseCase = {
  create: (novelUrl: string): Promise<LodingWorkEntity> =>
    transaction('RepeatableRead', async (tx) => {
      const { title, author } = await novelQuery.scrape(novelUrl);
      const LodingWork = workMethod.create({ novelUrl, title, author });
      await workCommand.save(tx, LodingWork);
      return LodingWork;
    }),
};
