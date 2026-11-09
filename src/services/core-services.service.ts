import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreServicesService {

  constructor() { }
  public logInCredentialDetails: Record<string, any> = {}

  public set logInCredential(loginDetails: Record<string, any>) {
    this.logInCredentialDetails = loginDetails
  }

  public get loggedInDetails(): any {
    return this.logInCredentialDetails;
  }


}
