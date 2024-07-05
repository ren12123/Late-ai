import type { LodingWorkEntity } from 'api/@types/work';
import { brandedId } from 'service/brandedId';
import { ulid } from 'ulid';

export const workMethod = {
  create: (val: { novelUrl: string; title: string; author: string }): LodingWorkEntity => {
    return {
      id: brandedId.work.entity.parse(ulid()),
      status: 'loding',
      novelUrl: val.novelUrl,
      title: val.title,
      author: val.author,
      createTime: Date.now(),
      imageUrl: null,
      errorMsg: null,
    };
  },
};
