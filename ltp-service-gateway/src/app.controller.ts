import { Controller, Get, HttpCode, Post, HttpStatus, Param } from "@nestjs/common"
import { Observable } from "rxjs/Observable"
import 'rxjs/add/observable/of'

@Controller('')
export class AppController {
  @Get()
  findAll () {
    return Observable.of(['aaa'])
  }

  @Post()
  @HttpCode(201)
  create () {

  }

  @Get(':id')
  findOne(@Param() params) {
    console.log(params.id)
    return {}
  }

}