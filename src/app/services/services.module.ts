import { NgModule } from '@angular/core';

import { UrlService } from './url.service';
import { GithubService } from './github.service';
import { BattleService } from './battle.service';
import { AuthService } from './auth.service';

@NgModule({
  providers: [ UrlService, GithubService, BattleService, AuthService ]
})
export class ServiceModule {}
