import type { EntityId } from './brandedId';

type WorkBase = {
  id: EntityId['work'];
  novelUrl: string;
  title: string;
  author: string;
  createTime: number;
};

export type LodingWorkEntity = WorkBase & {
  status: 'loding';
  imageUrl: null;
  errorMsg: null;
};

export type CompletedWorkEntity = WorkBase & {
  status: 'completed';
  imageUrl: string;
  errorMsg: null;
};

export type FailedWorkEntity = WorkBase & {
  status: 'failed';
  imageUrl: null;
  errorMsg: string;
};

export type WorkEntity = LodingWorkEntity | CompletedWorkEntity | FailedWorkEntity;
