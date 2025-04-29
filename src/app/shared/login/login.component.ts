import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, OAuthModule ],
  template: ''
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,  private router: Router) {}

  ngOnInit() {
    if (this.authService.accessToken) {
      // Se já tem token, vai direto para o dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // Se não tem token, inicia o fluxo de login
      this.authService.login();
    }
  }
}
