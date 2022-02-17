export interface Serializable<T> {
  deserialize(input: any): T;
}

export class RawObject<T> implements Serializable<RawObject<T>> {
  data: T;
  deserialize(input: any): RawObject<T> {
    console.log(input);
    this.data = input;
    return this;
  }
}
