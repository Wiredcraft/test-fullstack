export class LightningTalkDto {
  id: string;
  title: string;
  description: string;
  votes: number;
  owner: object;

  // the upload server address that resouce files are located
  store: string;

  // the uploaded ppt file
  rawFile?: {
    name: string;
    mimetype: string;
    filename: string;
    size: number;
  };

  // preview images that were generated from ppt file
  images?: string[];

  // the cover image
  cover?: string;

  // indicate that the lightning talk was voted by current user or not
  voted?: boolean;
}
