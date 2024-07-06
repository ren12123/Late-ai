import type { CompletedWorkEntity, FailedWorkEntity, LodingWorkEntity } from 'api/@types/work';
import { brandedId } from 'service/brandedId';
import { s3 } from 'service/s3Client';
import { ulid } from 'ulid';
import { getContentKey, getImageKey } from '../service/getS3Key';

export const workMethod = {
  create: (val: { novelUrl: string; title: string; author: string }): Promise<LodingWorkEntity> => {
    const id = brandedId.work.entity.parse(ulid());
    return {
      id,
      status: 'loding',
      novelUrl: val.novelUrl,
      title: val.title,
      author: val.author,
      createTime: Date.now(),
      contentUrl: await s3.getSignedUrl(getContentKey(id)),
      imageUrl: null,
      errorMsg: null,
    };
  },
  complete: async (lodingWork: LodingWorkEntity): Promise<CompletedWorkEntity> => {
    return {
      ...lodingWork,
      status: 'completed',
      imageUrl: await s3.getSignedUrl(getImageKey(lodingWork.id)),
    };
  },
  failuer: (lodingWork: LodingWorkEntity, errorMsg: string): FailedWorkEntity => {
    return {
      ...lodingWork,
      status: 'failed',
      errorMsg,
    };
  },
};
