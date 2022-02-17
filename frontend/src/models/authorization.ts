import { Serializable } from '.';

export class Authorization implements Serializable<Authorization> {
  authToken: string;
  deserialize(input) {
    this.authToken = input.authToken;
    return this;
  }
}
