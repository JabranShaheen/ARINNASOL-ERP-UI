import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {BroadcastService} from "@azure/msal-angular";
import { MsalService} from "@azure/msal-angular";
import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import { HttpServiceHelper } from '../common/HttpServiceHelper';


@Component
(
  {
  selector: 'app-home',
  templateUrl: './home.component.html',
  }
)
export class HomeComponent 
{

  constructor (
                private http: HttpClient, 
                private authService : MsalService,
                private httpService: HttpServiceHelper, 
                private broadcastService: BroadcastService                
              ) 
  {

  }
  private apiEndpoint: string = "https://arinnasol-erp-bll-api.azurewebsites.net/api/values";

  APICall()
  {
      this.http.get(this.apiEndpoint)
      .subscribe
      (
        (result) => console.log(result)
      );
    return null;  
  }

  login()
  {
    this.authService.loginPopup(
                                [
                                  "user.read" 
                                  ,
                                  "https://arinnasol-erp-bll-api.azurewebsites.net/api/values/user_impersonation"
                                ]
                              );
  }

  GetUserProfile()
  {
    let userData:any;
    let url = "https://graph.microsoft.com/v1.0/me";

    this.httpService.httpGetRequest(url)
    .subscribe(data => 
    {
      console.log("User Data");
      userData = data;
      console.log(userData);
    }, error => 
      {
        console.error(" Http get request to MS Graph failed" + JSON.stringify(error));
      }
    );
    
    

  }

  GetGroups()
  {
  
      let userData:any;
      let url = "https://graph.microsoft.com/v1.0/me/memberOf";

      this.httpService.httpGetRequest(url)
      .subscribe(data => 
      {
        console.log("Group Data");
        userData = data;
        console.log(userData);
      }, error => 
        {
          console.error(" Http get request to MS Graph failed" + JSON.stringify(error));
        }
      );
  


  }


  // CreateUser()
  // {
  
  //     let userData:any;
  //     let url = "https://graph.microsoft.com/v1.0/users";

  //     this.http.post(this.apiEndpoint,)
  //     .subscribe
  //     (
  //       (result) => console.log(result)
  //     );
  //   return null;    


  // }


}
