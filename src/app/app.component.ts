import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../AuthService';

import { signUp, signOut, confirmSignUp } from 'aws-amplify/auth';
import { FormsModule } from '@angular/forms';
import { AuthenticatorService } from '@aws-amplify/ui-angular';
// import { signUp, getCurrentUser, signOut as amplifySignOut } from 'aws-amplify/auth';
// import { AuthUser } from 'aws-amplify/auth';
// import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss'],
  
})
export class AppComponent {
  protected readonly title = signal('hello-world');
  showConfirmationScreen = false;
  email = '';
  password = '';
  ssnNumber = '';
  gender = '';
  phoneNumber = '';
  birthdate = '';
  userType = '';
  role = 'member';

confirmationCode = '';
  async signUp() {
    try {
    //   const isValid = await this.auth.validateSSN(this.ssnNumber);
    // if (!isValid) {
    //   alert('SSN is invalid. Signup aborted.');
    //   return;
    // }
    console.log('SSNNumber',this.auth.getSSN());
    this.auth.setSSN(this.ssnNumber);
      const result = await signUp({
        username: this.email,
        password: this.password,
        options: {
          userAttributes: {
            email: this.email,
            phone_number: this.phoneNumber,
            birthdate: this.birthdate,
            //'custom:ssnNumber': this.ssnNumber,
            'custom:gender': this.gender,
            'custom:types': this.userType,
            'custom:role': this.role,
          },
           clientMetadata: {
          ssnNumber: this.ssnNumber  
        }
        },
       
      });
      console.log('Sign-up successful', result);
      this.showConfirmationScreen = true;
      
      
    } catch (err) {
      console.error('Sign-up failed', err);
    }
  }

  async confirmUser() {
    try {
      await confirmSignUp({
        username: this.email,
        confirmationCode: this.confirmationCode,
      });
       // ⏳ When client backend is ready, call:
    // await this.auth.saveSSNToClientPortal(this.email);

      console.log('User confirmed!');
      this.showConfirmationScreen = false;
      alert('User confirmed. You can now log in.');
    } catch (err) {
      console.error('Confirmation failed', err);
    }
  }

  async signOut() {
    await signOut();
  }
 
//   formFields = {
//   signUp: {
//     email: {
//       label: 'Email',
//       placeholder: 'Enter your email',
//       required: true,
//       order: 1
//     },
//     password: {
//       label: 'Password',
//       placeholder: 'Enter your password',
//       required: true,
//       order: 2
//     },
//     name: {
//       label: 'Name',
//       placeholder: 'Enter your name',
//       required: true,
//       order: 3
//     },
//     phone_number: {
//       label: 'Phone Number',
//       placeholder: '+91XXXXXXXXXX',
//       required: true,
//       order: 4
//     },  
//     birthdate: {
//       type: 'date',
//       label: 'Date of Birth',
//       placeholder: 'YYYY-MM-DD',
//       required: true,
//       order: 5
//     },
//      gender: {
//       type: 'select',                
//       label: 'Gender',
//       required: true,
//       placeholder:'Male/Female/Other',
//       // options: [
//       //   { label: 'Select Gender', value: '' },  
//       //   { label: 'Male', value: 'male' },
//       //   { label: 'Female', value: 'female' },
//       //   { label: 'Non-Binary', value: 'non-binary' },
//       //   { label: 'Prefer not to say', value: 'prefer-not-to-say' }
//       // ],
//       order: 6
//     },

//     'custom:ssnNumber': {
//       type: 'text', 
//       label: 'SSN Number',
//       placeholder: '123-45-6789',
//       required: true,
//       order: 5
//     }
//   }
// };





  constructor(public auth: AuthService) {}
}
