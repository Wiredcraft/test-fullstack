import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LightningTalkService } from 'src/app/services/lightning-talk.service';

@Component({
  selector: 'app-lightning-talks-list',
  templateUrl: './lightning-talks-list.component.html',
  styleUrls: ['./lightning-talks-list.component.css']
})
export class LightningTalksListComponent implements OnInit {
  public queryPage;
  public pagenateList;

  constructor(private route: ActivatedRoute, private lightningTalkService: LightningTalkService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.route.queryParamMap.pipe(map((params: Params) => params.params)).subscribe(params => {
      this.queryPage = params.page;
      this.lightningTalkService.list(params).subscribe((data: any) => {
        this.pagenateList = data.result;
      });
    });

    // refresh data when current user changed
    this.authService.currentUser.subscribe(() => {
      this.lightningTalkService.list({page: this.queryPage}).subscribe((data: any) => {
        this.pagenateList = data.result;
      });
    });
  }

  generatePath(store, imgPath) {
    return `//${store}/upload/${imgPath}`;
  }

  safeIndex(index) {
    return Math.max(1, Math.min(index, this.pagenateList.maxPageCount));
  }

  vote(item) {
    this.lightningTalkService.vote(item.id).subscribe(() => {
      this.lightningTalkService.list({ page: this.queryPage }).subscribe((data: any) => {
        this.pagenateList = data.result;
      });
    });
  }

  unvote(item) {
    this.lightningTalkService.unvote(item.id).subscribe(() => {
      this.lightningTalkService.list({ page: this.queryPage }).subscribe((data: any) => {
        this.pagenateList = data.result;
      });
    });
  }

  own(item) {
    const me = this.authService.currentUserValue;
    return me && me.username === item.owner.username;
  }

}
