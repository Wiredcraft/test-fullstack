import { Controller, Get, Post, HttpCode, Param, Body, 
  HttpStatus, UseInterceptors, UseGuards } from "@nestjs/common";
import { Observable } from "rxjs/Observable";
import { CreateCatDto } from "./create-cat.dto";
import { RolesGuard } from "../common/guards/roles.guard";
import { LoggingInterceptor } from "../common/interceptors/logging.interceptor";
import { TransformInterceptor } from "../common/interceptors/transform.interceptor";
import { CatsService } from "./cats.service";
import { Cat } from "./cat.interface";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { Roles } from "../common/decorators/roles.decorator";

@Controller('cats')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CatsController {

  constructor(private readonly catsService: CatsService) {}

  @Get()
  async findAll (): Promise<Cat[]> {
    return this.catsService.findAll()
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles('admin')
  create (@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto)
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id) {
    console.log(id)
    return {}
  }

}