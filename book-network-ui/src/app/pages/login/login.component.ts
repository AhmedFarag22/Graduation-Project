import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationRequest, AuthenticationResponse } from '../../services/models';

import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';
import { KeycloakService } from '../../services/keycloak/keycloak.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  // authRequest: AuthenticationRequest = {email: '', password: ''};
  // errorMsg: Array<string> = [];

  constructor(
    // private router: Router,
    // private authService: AuthenticationService,
    // private tokenService: TokenService
    private keycloakService: KeycloakService
  ) {}
  async ngOnInit(): Promise<void> {
    // await this.keycloakService.init();
    await this.keycloakService.login();
  }


//   login() {
//     this.errorMsg = [];
//     this.authService.authenticate({
//       body: this.authRequest
//     }).subscribe({
//       next:  (res: AuthenticationResponse): void => {
//         this.tokenService.token = res.token as string;
//         this.router.navigate(['books']);
//       },
//       error: (err) => {
//         console.log(err);
//         if (err.error.validationError) {
//           this.errorMsg = err.error.validationError;
//         } else {
//           this.errorMsg.push(err.error.error);
//         }
//       }
//     });
//   }

//   register() {
//     this.router.navigate(['register'])
//   }

 }
