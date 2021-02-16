import {  ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import localeJa from '@angular/common/locales/ja';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeJa);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:
   [BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(),
    AppRoutingModule],
  providers: 
  [{ provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
