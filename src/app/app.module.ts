import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PublicModule } from './public/public.module';
import { FullContentComponent } from './full-content/full-content.component';
import { SharedModule } from './shared/shared.module';
import { ProtectedModule } from './protected/protected.module';
import { CustomContentComponent } from './custom-content/custom-content.component';


@NgModule({
  declarations: [
    AppComponent,
    FullContentComponent,
    CustomContentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PublicModule,
    ProtectedModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
