import type { WORK_STATUS } from 'api/@constants';
import type { EntityId } from './brandedId';

type WorkBase = {
  id: EntityId['work'];
  novelUrl: string;
  title: string;
  author: string;
  contentUrl: string;
  createTime: number;
};

export type LodingWorkEntity = WorkBase & {
  status: (typeof WORK_STATUS)[0];
  imageUrl: null;
  errorMsg: null;
};

export type CompletedWorkEntity = WorkBase & {
  status: (typeof WORK_STATUS)[1];
  imageUrl: string;
  errorMsg: null;
};

export type FailedWorkEntity = WorkBase & {
  status: (typeof WORK_STATUS)[2];
  imageUrl: null;
  errorMsg: string;
};

export type WorkEntity = LodingWorkEntity | CompletedWorkEntity | FailedWorkEntity;
