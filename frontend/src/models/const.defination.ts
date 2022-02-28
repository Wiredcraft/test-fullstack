import { Enums, Pagination, ValueLabel } from '.';

export namespace Consts {
  export const initSearchCondition = (): Pagination => {
    return {
      limit: 20,
      offset: 0,
      keyword: '',
    } as Pagination;
  };
}
