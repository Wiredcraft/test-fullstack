import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { LightningTalk, LightningTalkDocument } from 'src/db/lightning-talks.schema';
import { CreateUploadUriDto } from 'src/dto/create-upload-uri.dto';
import { UploadLightningTalkQueryDto } from 'src/dto/upload-lightning-talk-query.dto';
import { UploadLightningTalkDataDto } from 'src/dto/upload-lightning-talk-data.dto';
import { BizException } from 'src/exceptions';
import { UserDocument } from 'src/db/user.schema';
import { createConverterQueue } from './converterQueue';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  // Queue to convert the uploaded PPT to a set of previewable images.
  private readonly converterQueue = createConverterQueue(this.logger);

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @InjectModel(LightningTalk.name) private lightningTalkModel: Model<LightningTalkDocument>) {

    // Reload pending conversion documents from db
    this.lightningTalkModel.find({'store': this.getStoreAddr(), 'images': null}).then(docs => {
      docs.forEach(doc => this.convertDocument(doc))
    });
  }

  // Convert the PPT document to images and save result
  private convertDocument(doc) {
    this.converterQueue.push(doc, async (error, data) => {
      if (error) {
        return this.logger.error(`Convert Error: ${JSON.stringify(error)}`);
      }

      // PPT has been succesfully converted, just save the images paths to database
      try {
        await this.lightningTalkModel.updateOne({_id: doc._id}, {$set: {images: data}});
      } catch (e) {
        this.logger.error(`Failed to save convert result, Error: ${e.message}`);
      }
    });
  }

  private getStoreAddr() {
    return `${this.config.get('UPLOAD_HTTP_HOST')}:${this.config.get('UPLOAD_HTTP_PORT')}`;
  }

  public createUploadUri(data: CreateUploadUriDto) {
    const token = this.jwtService.sign(data)
    const uri = `http://${this.getStoreAddr()}/upload?token=${token}`;

    this.logger.debug(`Upload URI generated: ${uri}, for title: "${data.title}"`)
    return { uri };
  }

  async upload(q: UploadLightningTalkQueryDto, data: UploadLightningTalkDataDto, file, user: UserDocument) {
    // Check file type, should be *.ppt,*.pptx
    const ofn = file.originalname.toLowerCase();
    if (!ofn.endsWith('.ppt') && !ofn.endsWith('.pptx')) {
      throw new BizException(`Invaild file type`, 'upload-invaild-file', 400);
    }

    // Verify upload Uri token
    const token = this.jwtService.decode(q.token);
    if (!token || !token['title'] || token['title'] !== data.title) {
      throw new BizException(`Invaild upload token.`, 'upload-invaild-token', 400);
    }

    // Same title is not allow
    const duplicated = await this.lightningTalkModel.exists({ owner: user._id, title: data.title });
    if (duplicated) {
      throw new BizException(`Your already have an item with the same title "${data.title}".`, 'upload-title-conflict', 200);
    }

    // Save new lightning talk item to database
    const now = new Date();
    const doc = await this.lightningTalkModel.create({
      title: data.title,
      description: data.description,
      votes: 0,
      rawFile: {
        name: file.originalname,
        mimetype: file.mimetype,
        filename: file.filename,
        size: file.size,
      },
      store: this.getStoreAddr(),
      images: null,
      owner: user._id,
      createdAt: now,
      updatedAt: now,
    });

    // Issue a conversion job on this document
    this.convertDocument(doc);

    return {
      id: doc._id,
      title: doc.title,
      votes: doc.votes,
      store: doc.store,
      rawFile: doc.rawFile,
    };
  }
}
