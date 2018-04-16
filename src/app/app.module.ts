import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';
import { config } from '../environments/environment';
import { SingleQueryComponent } from './controllers/single-query/single-query.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    SingleQueryComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  
  
}
