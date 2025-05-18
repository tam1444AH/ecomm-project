import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import  { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: Product[] | undefined;
  cartItems: number = 0;
  constructor(private route: Router, private product: ProductService) { }
  ngOnInit() {
    this.route.events.subscribe((val: any) => {
    
      if (val.url) {
        if (typeof window !== 'undefined') {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.menuType = 'seller';
            this.sellerName = sellerData.name;
          }
          else if (localStorage.getItem('user')) {
            this.menuType = 'user';
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.product.getCartList(userData.id);
          }
          else {
            this.menuType = 'default';
          }
        }
      }
    });

    if (typeof window !== 'undefined') {
      let cartData = localStorage.getItem('localCart');
      if (cartData) {
        this.cartItems = JSON.parse(cartData).length;
      }
      this.product.cartData.subscribe((items) => {
        this.cartItems = items.length;
      });
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('seller');
      this.route.navigate(['/seller-auth']);
    }
  }

  userLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
      this.route.navigate(['/user-auth']);
      this.product.cartData.emit([]);
    }
  }

  searchProducts(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      if (element.value.length > 0) {
        this.product.searchProducts(element.value).subscribe((result) => {
          if (result) {
            if (result.length > 5) {
              result.length = 5;
            }
            this.searchResult = result;
          }
        });
      }
      else {
        this.searchResult = undefined;
      }
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.route.navigate(['/search', val]);
  }

  redirectToDetails(id: string) {
    this.route.navigate(['/details/' + id]);
  }
}
