import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import {Crud} from './crud.decorator';

@Module({
  providers: [CrudService],
  exports: [CrudService, Crud],
})
export class CrudModule {}
