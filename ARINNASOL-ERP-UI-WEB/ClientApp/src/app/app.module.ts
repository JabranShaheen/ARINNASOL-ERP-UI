import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MsalModule} from "@azure/msal-angular";
import { MsalInterceptor} from "@azure/msal-angular";
import {LogLevel} from "msal";

import { HttpServiceHelper } from './common/HttpServiceHelper';

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log("client logging" + message);
}

export const protectedResourceMap:[
  string, 
  string[]][]=[ 
    ['https://arinnasol-erp-bll-api.azurewebsites.net/api/values',
    ['https://arinnasol-erp-bll-api.azurewebsites.net/api/values/user_impersonation']] , 
    ['https://graph.microsoft.com/v1.0/me', 
    ['user.read']],
    ['https://graph.microsoft.com/Group.Read.All', 
    ['Directory.Read.All']] 
  ];

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    MsalModule.forRoot({
        clientID: 'cf986618-5fbd-4f52-869e-af4e55a15d7f',
        authority: "https://login.microsoftonline.com/bd4dc115-f16f-425b-943b-4c660006109c",
        validateAuthority: true,
        // redirectUri: "https://arinnasol-erp-ui.azurewebsites.net",
        redirectUri: "http://localhost:4200",
        cacheLocation : "localStorage",
        // postLogoutRedirectUri: "https://arinnasol-erp-ui.azurewebsites.net",
        postLogoutRedirectUri: "http://localhost:4200",        
        navigateToLoginRequestUrl: true,
        popUp: false,
        consentScopes: ["Directory.Read.All", "user.read", "https://arinnasol-erp-bll-api.azurewebsites.net/api/values/user_impersonation"],
        unprotectedResources: ["https://www.microsoft.com/en-us/"],
        protectedResourceMap: protectedResourceMap,
        logger: loggerCallback,
        correlationId: '6666',
        level: LogLevel.Info,
        piiLoggingEnabled: true         
      }
    )
  ],
  providers: [ HttpServiceHelper,
     {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
