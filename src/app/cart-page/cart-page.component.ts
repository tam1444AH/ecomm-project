import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, priceSummary } from '../data-type';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cartData: Cart[] | undefined;
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private product: ProductService, private router: Router) { }
  
  ngOnInit() {
    this.loadDetails();
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }

  removeItemFromCart(cartId: string | undefined) {
    cartId && this.product.removeCartItem(cartId).subscribe((result) => {
      if (result) {
        this.loadDetails();
      }
    })
  }

  loadDetails() {
    this.product.currentCart().subscribe((result) => {
      this.cartData = result;
      console.warn(this.cartData);
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);
        }
      })
      this.priceSummary.price = price;
      this.priceSummary.discount = price / 10;
      this.priceSummary.tax = price / 10;
      this.priceSummary.delivery = 100;
      this.priceSummary.total = price+(price / 10)+(100)-(price / 10);
      console.warn(this.priceSummary);
      if (!this.cartData.length) {
        this.router.navigate(['/checkout']);
      }
    });
  }

}
