import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';

@Component({
  selector: 'app-checkout',
  imports: [FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  constructor(private product: ProductService) {}

  ngOnInit() {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
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
        };

        this.product.orderNow(orderData).subscribe((result) => {
          if (result) {
            alert('Order has been placed successfully');
          }
        });
      }
    }
  }
}
