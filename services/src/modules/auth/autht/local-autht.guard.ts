import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_AUTHT_STRATEGY_TOKEN } from './local-autht.strategy';

@Injectable()
export class LocalAutthGuard extends AuthGuard(LOCAL_AUTHT_STRATEGY_TOKEN) {}
