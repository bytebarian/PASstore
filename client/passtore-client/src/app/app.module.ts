import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddSecretComponent } from './add-secret/add-secret.component';
import { ViewSecretsComponent } from './view-secrets/view-secrets.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddSecretComponent,
    ViewSecretsComponent,
    AuthenticateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: AuthenticateComponent },
      { path: 'authenticate', component: AuthenticateComponent },
      { path: 'add-secret', component:AddSecretComponent },
      { path: 'view-secret', component:ViewSecretsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
