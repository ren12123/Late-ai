import type { LodingWorkEntity } from 'api/@types/work';
import { transaction } from 'service/prismaClient';
import { s3 } from 'service/s3Client';
import { workEvent } from '../event/workEvent';
import { workMethod } from '../model/workMethod';
import { novelQuery } from '../repository/novelQuery';
import { workCommand } from '../repository/workCommand';
import { getContentKey, getImageKey } from '../service/getS3Key';

export const workUseCase = {
  create: (novelUrl: string): Promise<LodingWorkEntity> =>
    transaction('RepeatableRead', async (tx) => {
      const { title, author, html } = await novelQuery.scrape(novelUrl);
      const lodingWork = await workMethod.create({ novelUrl, title, author });
      await workCommand.save(tx, lodingWork);
      await s3.putText(getContentKey(lodingWork.id), html);

      workEvent.workCreated({ lodingWork, html });
      return lodingWork;
    }),
  complete: (lodingWork: LodingWorkEntity, image: Buffer): Promise<void> =>
    transaction('RepeatableRead', async (tx) => {
      const completedWork = await workMethod.complete(lodingWork);

      await workCommand.save(tx, completedWork);
      await s3.putImage(getImageKey(lodingWork.id), image);
    }),
  failuer: (lodingWork: LodingWorkEntity, errorMsg: string): Promise<void> =>
    transaction('RepeatableRead', async (tx) => {
      const failedWork = workMethod.failuer(lodingWork, errorMsg);
      await workCommand.save(tx, failedWork);
    }),
};
