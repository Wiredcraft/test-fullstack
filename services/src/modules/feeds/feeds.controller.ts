import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { EntityWhereUniqueInput } from 'src/common/EntWhereUnique.input';
import { NormalizedException } from 'src/get-normalized-error';
import { FeedCreateInput } from './dto/FeedCrete.dto';
import { FeedGetManyQuery, FeedGetManyResponse } from './dto/FeedGetMany.dto';
import { FeedPatchInput } from './dto/FeedPatch.dto';
import { Feed } from './entities/feed.entity';
import { FeedsService } from './feeds.service';

/**
 * Many of lines here are borrowed from a [amplication](https://amplication.com/) auto generated project, to learn rbac with nestjs-access-control, will implement here soom
 *
 * @export
 * @class FeedsController
 */
// @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
// @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
@swagger.ApiInternalServerErrorResponse({ type: NormalizedException })
@swagger.ApiTags('Feeds')
@common.Controller('feeds')
export class FeedsController {
  constructor(
    // @nestAccessControl.InjectRolesBuilder()
    // private readonly rolesBuilder: nestAccessControl.RolesBuilder,
    private readonly _service: FeedsService,
  ) {}

  // @nestAccessControl.UseRoles({
  //   resource: "Daylight",
  //   action: "create",
  //   possession: "any",
  // })
  @common.Post()
  @swagger.ApiBearerAuth()
  @swagger.ApiOperation({
    summary: 'Create One Feed',
  })
  @swagger.ApiForbiddenResponse()
  @swagger.ApiCreatedResponse({ type: Feed })
  async createOne(
    //   @nestAccessControl.UserRoles() userRoles: string[]
    @common.Body() payload: FeedCreateInput,
  ): Promise<Feed> {
    //   const permission = this.rolesBuilder.permission({
    //     role: userRoles,
    //     action: "create",
    //     possession: "any",
    //     resource: "Daylight",
    //   });
    // bacUtil.getInvalidAttributes(permission, data);
    //   if (invalidAttributes.length) {
    //     const properties = invalidAttributes
    //       .map((attribute: string) => JSON.stringify(attribute))
    //       .join(", ");
    //     const roles = userRoles
    //       .map((role: string) => JSON.stringify(role))
    //       .join(",");
    //     throw new errors.ForbiddenException(
    //       `providing the properties: ${properties} on ${"Daylight"} creation is forbidden for roles: ${roles}`
    //     );
    //   }
    //   // @ts-ignore
    // return await this.service.create({
    return null;
  }

  // @nestAccessControl.UseRoles({
  //   resource: "Daylight",
  //   action: "read",
  //   possession: "any",
  // })
  @common.Get()
  @swagger.ApiOkResponse({ type: [Feed] })
  @swagger.ApiForbiddenResponse()
  async findMany(
    // @nestAccessControl.UserRoles() userRoles: string[]
    @common.Query() { page, pageSize }: FeedGetManyQuery,
  ): Promise<FeedGetManyResponse> {
    const pageSkip = (page - 1) * pageSize;
    // @ts-ignore
    return this._service.findLimitedAndCountTotal(pageSkip, pageSize);
    //   const permission = this.rolesBuilder.permission({
    //     role: userRoles,
    //     action: "read",
    //     possession: "any",
    //     resource: "Daylight",
    //   });
    //   return results.map((result) => permission.filter(result));
    return null;
  }

  // @nestAccessControl.UseRoles({
  //   resource: "Daylight",
  //   action: "read",
  //   possession: "own",
  // })
  @common.Get(':id')
  @swagger.ApiOkResponse({ type: Feed })
  @swagger.ApiNotFoundResponse({ type: NormalizedException })
  @swagger.ApiForbiddenResponse()
  async findOne(
    //   @nestAccessControl.UserRoles() userRoles: string[]
    @common.Param() params: EntityWhereUniqueInput,
  ): Promise<Feed> {
    //   const permission = this.rolesBuilder.permission({
    //     role: userRoles,
    //     action: "read",
    //     possession: "own",
    //     resource: "Daylight",
    //   });
    return;
  }

  @common.Patch(':id')
  @swagger.ApiBearerAuth()
  // @nestAccessControl.UseRoles({
  //   resource: "Daylight",
  //   action: "update",
  //   possession: "any",
  // })
  @swagger.ApiOkResponse({ type: Feed })
  @swagger.ApiNotFoundResponse({ type: NormalizedException })
  @swagger.ApiForbiddenResponse()
  async pathOne(
    //   @nestAccessControl.UserRoles() userRoles: string[]
    @common.Param() { id: feedId }: EntityWhereUniqueInput,
    @common.Body() payload: FeedPatchInput,
  ): Promise<Feed> {
    // const permission = this.rolesBuilder.permission({
    //   role: userRoles,
    //   action: "update",
    //   possession: "any",
    //   resource: "Daylight",
    // });
    return;
  }

  @common.Delete(':id')
  @swagger.ApiBearerAuth()
  // @nestAccessControl.UseRoles({
  //   resource: "Daylight",
  //   action: "delete",
  //   possession: "any",
  // })
  @swagger.ApiOkResponse({ type: Feed })
  @swagger.ApiNotFoundResponse({ type: NormalizedException })
  @swagger.ApiForbiddenResponse()
  async deleteOne(
    @common.Param() params: EntityWhereUniqueInput,
  ): Promise<Feed> {
    //   try {
    //   } catch (error) {
    //     if (isRecordNotFoundError(error)) {
    //       throw new errors.NotFoundException(
    //         `No resource was found for ${JSON.stringify(params)}`
    //       );
    //     }
    //     throw error;
    //   }
    return;
  }

  // @common.Get('/:id/votes')
  // // @nestAccessControl.UseRoles({
  // //   resource: "Daylight",
  // //   action: "read",
  // //   possession: "any",
  // // })
  // async findManyVotes(
  //   @common.Param() params: EntityWhereUniqueInput,
  //   @common.Query() query: DaDepictionWhereInput,
  //   @nestAccessControl.UserRoles() userRoles: string[],
  // ): Promise<UserFeedVote[]> {
  //   // const permission = this.rolesBuilder.permission({
  //   //   role: userRoles,
  //   //   action: "read",
  //   //   possession: "any",
  //   //   resource: "DaDepiction",
  //   // });
  //   // const results = await this.service.findOne({ where: params }).depictions({
  //   //   where: query,
  //   //   select: {
  //   //     createdAt: true,
  //   //     id: true,
  //   //     updatedAt: true,
  //   //   },
  //   // });
  //   // return results.map((result) => permission.filter(result));
  //   return;
  // }
}
