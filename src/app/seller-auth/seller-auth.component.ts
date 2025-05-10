import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { signUp, Login } from '../data-type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {

  showLogin = false;
  authError:string = '';

  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  constructor(private seller: SellerService) { }
  signUp(data: signUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
  login(data: Login): void {
    console.warn(data);
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is incorrect';
      }
    })
  }
  
  openLogin() {
    this.showLogin = true;
  }
  openSignUp() {
    this.showLogin = false;
  }
}
