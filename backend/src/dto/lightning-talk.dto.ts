export class LightningTalkDto {
  id: string;
  title: string;
  votes: number;
  owner: object;
  store: string;
  rawFile: {
    name: string;
    mimetype: string;
    filename: string;
    size: number;
  };
  cover?: string;
  images?: string[];
  voted?: boolean;
}
