<<<<<<< HEAD
import type { CompletedWorkEntity, FailedWorkEntity, LodingWorkEntity } from 'api/@types/work';
=======
import type { CompletedWorkEntity, FailedWorkEntity, LoadingWorkEntity } from 'api/@types/work';
>>>>>>> other-repo/develop
import { brandedId } from 'service/brandedId';
import { s3 } from 'service/s3Client';
import { ulid } from 'ulid';
import { getContentKey, getImageKey } from '../service/getS3Key';

export const workMethod = {
<<<<<<< HEAD
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
=======
  create: async (val: {
    novelUrl: string;
    title: string;
    author: string;
  }): Promise<LoadingWorkEntity> => {
    const id = brandedId.work.entity.parse(ulid());
    return {
      id: brandedId.work.entity.parse(ulid()),
      status: 'loading',
      novelUrl: val.novelUrl,
      title: val.title,
      author: val.author,
      contentUrl: await s3.getSignedUrl(getContentKey(id)),
      createdTime: Date.now(),
>>>>>>> other-repo/develop
      imageUrl: null,
      errorMsg: null,
    };
  },
<<<<<<< HEAD
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
=======
  complete: async (loadingWork: LoadingWorkEntity): Promise<CompletedWorkEntity> => {
    return {
      ...loadingWork,
      status: 'completed',
      imageUrl: await s3.getSignedUrl(getImageKey(loadingWork.id)),
    };
  },
  failure: (loadingWork: LoadingWorkEntity, errorMsg: string): FailedWorkEntity => {
    return {
      ...loadingWork,
>>>>>>> other-repo/develop
      status: 'failed',
      errorMsg,
    };
  },
};
