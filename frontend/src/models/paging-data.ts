import { Serializable } from './serializable';
export class PagingData<T extends Serializable<T>> {
  totalRecords: number = 0;
  data: T[] = [];
}
