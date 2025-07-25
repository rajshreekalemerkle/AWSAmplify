// import { Injectable } from '@angular/core';
// import { AuthUser, getCurrentUser, signOut, fetchAuthSession, AuthTokens } from 'aws-amplify/auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }

//   async getCurrentUser(): Promise<AuthUser> {
//     return await getCurrentUser();
//   }

//   async getCurrentSession(): Promise<AuthTokens | undefined> {
//     return (await fetchAuthSession()).tokens;
//   }

//   async getCurrentUserFullName(): Promise<string | undefined> {
//     let cognitoToken = await (await fetchAuthSession()).tokens;
//     return cognitoToken?.idToken?.payload['name']?.toString();
//   }

//   signOut() {
//     signOut();
//   }

// }
import { Injectable } from '@angular/core';
import { AuthUser, getCurrentUser, signOut, fetchAuthSession, AuthTokens } from 'aws-amplify/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  async getCurrentUser(): Promise<AuthUser> {
    return await getCurrentUser();
  }

  async getCurrentSession(): Promise<AuthTokens | undefined> {
    return (await fetchAuthSession()).tokens;
  }

  async getCurrentUserFullName(): Promise<string | undefined> {
    const tokens = await (await fetchAuthSession()).tokens;
    return tokens?.idToken?.payload['name']?.toString();
  }
  async getCurrentUserSSN(): Promise<string | undefined> {
  const tokens = await (await fetchAuthSession()).tokens;
  return tokens?.idToken?.payload['custom:ssnNumber']?.toString();
}
private ssnNumber: string = '';

  setSSN(ssn: string) {
    this.ssnNumber = ssn;
  }

  getSSN(): string {
    return this.ssnNumber;
  }

 // Simulated API call
  // saveSSNToClientPortal(email: string): Promise<any> {
  //   return fetch('https://your-api/save-ssn', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email,
  //       ssn: this.ssnNumber
  //     })
  //   }).then(res => res.json());
  // }

  signOut() {
    return signOut();
  }
}
