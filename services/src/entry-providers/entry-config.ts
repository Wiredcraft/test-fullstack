import { ValueProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Entry scope entry config, which is a singleton
 *
 * used by
 *
 * - EntryProviders: Swagger, Security
 * - main.js
 *
 */
export const ENTRY_CONFIG = Symbol('ENTRY_CONFIG');

export const EntryConfigProvider = <ValueProvider<ConfigService>>{
  provide: ENTRY_CONFIG,
  useValue: new ConfigService(),
};
