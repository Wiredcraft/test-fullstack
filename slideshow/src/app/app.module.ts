import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { SlideshowComponent } from './slideshow/slideshow.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    SlideshowComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const el = createCustomElement(SlideshowComponent, { injector: this.injector });
    customElements.define('x-slideshow', el);
  }

}
