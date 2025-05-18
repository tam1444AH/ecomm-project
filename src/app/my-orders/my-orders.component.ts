import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Order } from '../data-type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent {

  orderData: Order[] | undefined;

  constructor(private product: ProductService) { }

  ngOnInit() {
    this.getOrderList();
  }

  cancelOrder(orderId: string | undefined) {
    orderId && this.product.cancelOrder(orderId).subscribe((result) => {
      if (result) {
        this.getOrderList();
      }
    });
  }

  getOrderList() {
    this.product.orderList().subscribe((result) => {
      this.orderData = result;
      console.warn(this.orderData);
    });
  }

}
