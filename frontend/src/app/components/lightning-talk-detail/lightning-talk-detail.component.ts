import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LightningTalkService } from 'src/app/services/lightning-talk.service';

@Component({
  selector: 'app-lightning-talk-detail',
  templateUrl: './lightning-talk-detail.component.html',
  styleUrls: ['./lightning-talk-detail.component.css']
})
export class LightningTalkDetailComponent implements OnInit {
  id;
  item;

  constructor(private route: ActivatedRoute, private lightningTalkService: LightningTalkService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.lightningTalkService.get(this.id).subscribe((data:any) => {
      this.item = data.result;
    })

    // refresh data when current user changed
    this.authService.currentUser.subscribe(() => {
      this.lightningTalkService.get(this.id).subscribe((data: any) => {
        this.item = data.result;
      });
    });
  }

  generatePath(store, imgPath) {
    if (Array.isArray(imgPath)) {
      return imgPath.map(path => `//${store}/upload/${path}`)
    } else {
      return `//${store}/upload/${imgPath}`;
    }
  }

  own(item) {
    const me = this.authService.currentUserValue;
    return me && me.username === item.owner.username;
  }

  vote(item) {
    this.lightningTalkService.vote(item.id).subscribe(() => {
      this.lightningTalkService.get(this.id).subscribe((data: any) => {
        this.item = data.result;
      });
    });
  }

  unvote(item) {
    this.lightningTalkService.unvote(item.id).subscribe(() => {
      this.lightningTalkService.get(this.id).subscribe((data: any) => {
        this.item = data.result;
      });
    });
  }
}
