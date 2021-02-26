import * as common from '@nestjs/common';
import * as swagger from '@nestjs/swagger';
import { ApiTag } from 'src/common/api-tag.enum';
import { NormalizedException } from 'src/get-normalized-error';
import { UsersService } from './users.service';

/**
 * For session based auth in this project, a user should not use get(user/:id) for his/her profile, he won't know his id in most cases
 * endpoints within this controller should only be accessed by the admin+ roles
 *
 * See './user-profile.controller' for safe profile fetch
 *
 * @export
 * @class UsersController
 */
// @common.UseInterceptors(nestMorgan.MorganInterceptor("combined"))
// @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
@swagger.ApiTags(ApiTag.USERS)
@swagger.ApiBearerAuth()
@common.Controller('users')
@swagger.ApiInternalServerErrorResponse({ type: NormalizedException })
export class UsersController {
  // @ApiOperation({
  //   summary: 'Find all users',
  // })
  // @Get()
  // @UseGuards(ConditionalAuthGuard, AuthZGuard)
  // @UsePermissions({
  //   action: AuthtActionVerb.READ,
  //   resource: Resource.USERS_LIST,
  //   possession: AuthPossession.ANY,
  // })
  // async findUsers() {
  //   return await this.usersSrv.findAll();
  // }
  constructor(
    // @nestAccessControl.InjectRolesBuilder()
    // private readonly rolesBuilder: nestAccessControl.RolesBuilder,
    private readonly _service: UsersService,
  ) {}

  // @common.Post()
  // // @nestAccessControl.UseRoles({
  // //   resource: 'User',
  // //   action: 'create',
  // //   possession: 'any',
  // // })
  // @swagger.ApiInternalServerErrorResponse({ type: NormalizedException })
  // async create(
  //   // @nestAccessControl.UserRoles() userRoles: string[],
  //   @common.Body() data: UserCreateInput,
  // ): Promise<User> {
  //   const permission = this.rolesBuilder.permission({
  //     role: userRoles,
  //     action: 'create',
  //     possession: 'any',
  //     resource: 'User',
  //   });
  //   const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
  //   if (invalidAttributes.length) {
  //     const properties = invalidAttributes
  //       .map((attribute: string) => JSON.stringify(attribute))
  //       .join(', ');
  //     const roles = userRoles
  //       .map((role: string) => JSON.stringify(role))
  //       .join(',');
  //     throw new errors.ForbiddenException(
  //       `providing the properties: ${properties} on ${'User'} creation is forbidden for roles: ${roles}`,
  //     );
  //   }
  //   // @ts-ignore
  //   return await this.service.create({
  //     ...query,
  //     data: data,
  //     select: {
  //       createdAt: true,
  //       id: true,
  //       phone: true,
  //       roles: true,
  //       updatedAt: true,
  //       username: true,
  //     },
  //   });
  // }

  // @common.Get()
  // // @nestAccessControl.UseRoles({
  // //   resource: 'User',
  // //   action: 'read',
  // //   possession: 'any',
  // // })
  // @swagger.ApiOkResponse({ type: [User] })
  // @swagger.ApiForbiddenResponse()
  // async findMany(): Promise<User[]> {
  //   // no implementation
  //   return;
  // }

  // @common.Get(':id')
  // // @nestAccessControl.UseRoles({
  // //   resource: 'User',
  // //   action: 'read',
  // //   possession: 'own',
  // // })
  // @swagger.ApiOkResponse({ type: User })
  // @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  // @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  // async findOne(
  //   @common.Query() query: {},
  //   @common.Param() params: UserWhereUniqueInput,
  //   @nestAccessControl.UserRoles() userRoles: string[],
  // ): Promise<User | null> {}

  // @common.UseInterceptors(nestMorgan.MorganInterceptor('combined'))
  // @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  // @common.Patch('/:id')
  // @nestAccessControl.UseRoles({
  //   resource: 'User',
  //   action: 'update',
  //   possession: 'any',
  // })
  // @swagger.ApiOkResponse({ type: User })
  // @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  // @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  // async update(
  //   @common.Query() query: {},
  //   @common.Param() params: UserWhereUniqueInput,
  //   @common.Body()
  //   data: UserUpdateInput,
  //   @nestAccessControl.UserRoles() userRoles: string[],
  // ): Promise<User | null> {
  //   const permission = this.rolesBuilder.permission({
  //     role: userRoles,
  //     action: 'update',
  //     possession: 'any',
  //     resource: 'User',
  //   });
  //   const invalidAttributes = abacUtil.getInvalidAttributes(permission, data);
  //   if (invalidAttributes.length) {
  //     const properties = invalidAttributes
  //       .map((attribute: string) => JSON.stringify(attribute))
  //       .join(', ');
  //     const roles = userRoles
  //       .map((role: string) => JSON.stringify(role))
  //       .join(',');
  //     throw new errors.ForbiddenException(
  //       `providing the properties: ${properties} on ${'User'} update is forbidden for roles: ${roles}`,
  //     );
  //   }
  //   try {
  //     // @ts-ignore
  //     return await this.service.update({
  //       ...query,
  //       where: params,
  //       data: data,
  //       select: {
  //         createdAt: true,
  //         id: true,
  //         phone: true,
  //         roles: true,
  //         updatedAt: true,
  //         username: true,
  //       },
  //     });
  //   } catch (error) {
  //     if (isRecordNotFoundError(error)) {
  //       throw new errors.NotFoundException(
  //         `No resource was found for ${JSON.stringify(params)}`,
  //       );
  //     }
  //     throw error;
  //   }
  // }
  // @common.UseInterceptors(nestMorgan.MorganInterceptor('combined'))
  // @common.UseGuards(basicAuthGuard.BasicAuthGuard, nestAccessControl.ACGuard)
  // @common.Delete('/:id')
  // @nestAccessControl.UseRoles({
  //   resource: 'User',
  //   action: 'delete',
  //   possession: 'any',
  // })
  // @swagger.ApiOkResponse({ type: User })
  // @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  // @swagger.ApiForbiddenResponse({ type: errors.ForbiddenException })
  // async delete(
  //   @common.Query() query: {},
  //   @common.Param() params: UserWhereUniqueInput,
  // ): Promise<User | null> {
  //   try {
  //     return await this.service.delete({
  //       ...query,
  //       where: params,
  //       select: {
  //         createdAt: true,
  //         id: true,
  //         phone: true,
  //         roles: true,
  //         updatedAt: true,
  //         username: true,
  //       },
  //     });
  //   } catch (error) {
  //     if (isRecordNotFoundError(error)) {
  //       throw new errors.NotFoundException(
  //         `No resource was found for ${JSON.stringify(params)}`,
  //       );
  //     }
  //     throw error;
  //   }
  // }
}
