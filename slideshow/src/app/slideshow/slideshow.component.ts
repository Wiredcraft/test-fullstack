import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SlideshowComponent implements OnInit {
  @Input() images: string[];
  @Input() width: string;
  index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  prev() {
    this.index = Math.max(0, this.index - 1);
  }

  next() {
    this.index = Math.min(this.images.length - 1, this.index + 1);
  }
}
