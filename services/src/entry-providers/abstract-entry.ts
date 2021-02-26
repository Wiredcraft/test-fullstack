import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { isFunctionNode14 } from 'src/common/utils/utils';
import { ENTRY_CONFIG } from './entry-config';

type GetConfigCb<T> = (v: string) => T;

@Injectable()
export abstract class AbstractEntryProvider {
  private _appInstance: NestExpressApplication = null;
  constructor(
    @Inject(ENTRY_CONFIG)
    private readonly _configService: ConfigService,
    private readonly _httpAdapterHost: HttpAdapterHost,
  ) {}

  protected get app() {
    return this._appInstance;
  }

  /**
   * Entry scope config value parser
   *
   * @protected
   * @memberof AbstractEntryProvider
   */
  protected getConfig(propertyPath: string): string;
  protected getConfig<T>(propertyPath: string, cb?: GetConfigCb<T>): T;
  protected getConfig<T>(propertyPath: string, defaultValue?: T): T;
  protected getConfig<T>(
    propertyPath: string,
    cb?: GetConfigCb<T>,
    defaultValue?: T,
  ): T;
  protected getConfig(propertyPath: string, y?: any, z?: any) {
    let cb = (v: string) => v;
    let defaultValue = z;

    if (isFunctionNode14(y)) cb = y;
    else defaultValue = y;

    const res = cb(this._configService.get<string>(propertyPath));
    if (res === undefined || res === null) return defaultValue;
    return res;
  }

  protected _setup() {
    this._setAppInstance();
  }

  private _setAppInstance() {
    const httpAdapter = this._httpAdapterHost.httpAdapter;
    this._appInstance = httpAdapter.getInstance<NestExpressApplication>();
  }
}
