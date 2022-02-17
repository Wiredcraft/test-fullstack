import { BaseModel } from '.';
import { Serializable } from './serializable';

export class LightingTalk extends BaseModel implements Serializable<LightingTalk> {
  id: number;
  topic: string;
  content: string;
  rating: number;
  showContent: boolean = false; // not for data binding
  deserialize(input: any): LightingTalk {
    this.id = input.id;
    this.topic = input.topic;
    this.content = input.content;
    this.rating = input.rating;
    super.init(input);
    return this;
  }
}
