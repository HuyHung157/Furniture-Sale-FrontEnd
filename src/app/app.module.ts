import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SERVICES } from './home-page/services';
import { GraphQLModule } from './shared/modules/gql/gql.module';
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
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    GraphQLModule,
  ],
  exports: [
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
