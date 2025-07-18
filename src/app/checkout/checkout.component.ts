import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Cart, Order } from '../data-type';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  cartData: Cart[] | undefined;
  orderMsg: string | undefined;
  constructor(private product: ProductService, private router: Router) {}

  ngOnInit() {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + +item.price * +item.quantity;
        }
      });
      this.totalPrice = price + price / 10 + 100 - price / 10;
      console.warn(this.totalPrice);
    });
  }

  orderNow(data: {email: string, address: string, contact: string}) {
    if (typeof window !== 'undefined') {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;

      if (this.totalPrice) {
        let orderData : Order = {
          ...data,
          totalPrice: this.totalPrice,
          userId,
          id: undefined,
        };

        this.cartData?.forEach((item) => {
          setTimeout(() => {
            item.id && this.product.deleteCartItems(item.id);
          }, 500);
        });

        this.product.orderNow(orderData).subscribe((result) => {
          if (result) {
            alert('Order has been placed successfully');
            this.orderMsg = 'Your order has been placed successfully';
            setTimeout(() => {
              this.orderMsg = undefined;
              this.router.navigate(['/my-orders']);
            }, 4000);
          }
        });
      }
    }
  }
}
