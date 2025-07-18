import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }
  userSignUp(data: signUp){
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((result) => {
      if (result) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }
      }
    })
  }

  reloadSeller() {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('seller')) {
        this.isSellerLoggedIn.next(true);
        this.router.navigate(['seller-home']);
      }
    }
  }

  userLogin(data: Login) {
   this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe : 'response' })
   .subscribe((result: any) => {
    if (result && result.body && result.body.length === 1) {
      this.isLoginError.emit(false);
      if (typeof window !== 'undefined') {
        localStorage.setItem('seller', JSON.stringify(result.body));
      }
      this.router.navigate(['seller-home']);
    } else {
      console.warn('Login failed');
      this.isLoginError.emit(true);
    }
   })
  }
}
