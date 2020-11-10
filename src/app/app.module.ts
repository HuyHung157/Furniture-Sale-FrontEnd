import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { StoreModule } from '@ngrx/store';
import { ACTIONS } from './store/actions';
import { SERVICES } from './home-page/services';
import { reducers, metaReducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SlickCarouselModule,
    StoreModule.forRoot(reducers,
      // { metaReducers }
    ),
  ],
  providers: [SERVICES, ACTIONS],
  bootstrap: [AppComponent]
})
export class AppModule { }
