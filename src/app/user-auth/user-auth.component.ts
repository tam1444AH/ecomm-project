import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cart, Login, Product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent {
  constructor(private user: UserService, private product: ProductService) { }
  showLogin : boolean = false;
  authError: string = "";

  ngOnInit() {
    this.user.userAuthReload();
  }

  signUp(data: signUp) {
    this.user.userSignUp(data);
  }

  login(data: Login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = "Email or Password is incorrect";
      }
      else {
        this.localCartToRemoteCart();
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemoteCart() {
    if (typeof window !== 'undefined') {
      let data = localStorage.getItem('localCart');
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      if (data) {
        let cartDataList: Product[] = JSON.parse(data);
        cartDataList.forEach((product: Product, index: number) => {
          let cartData: Cart = {
            ...product,
            productId: product.id,
            userId,
          }
          delete cartData.id;
          setTimeout(() => {
            this.product.addToCart(cartData).subscribe((result) => {
              if (result) {
                console.warn("local cart converted to remote cart", result);
              }
            })
          }, 500);
          if (cartDataList.length === index + 1) {
            localStorage.removeItem('localCart');
          }
        })
      }

      setTimeout(() => {
        this.product.getCartList(userId);
      }, 2000);
    }
  }


}
