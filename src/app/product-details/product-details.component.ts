import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cart, Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }
  productData: Product | undefined;
  productQuantity: number = 1;
  removeCart = false;
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.product.getProduct(id).subscribe((result) => {
        if (result) {
          this.productData = result;
        }
      });
    }
    if (typeof window !== 'undefined') {
      let cartData = localStorage.getItem('localCart');
      if (id && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item : Product) => id === item.id.toString());
        if (items.length) {
          this.removeCart = true;
        }
        else {
          this.removeCart = false;
        }
      }
    }
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (typeof window !== 'undefined') {
        if (!localStorage.getItem('user')) {
          this.product.localAddToCart(this.productData);
          this.removeCart = true;
        }
        else {
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id;
          let cartData: Cart = {
            ...this.productData,
            userId,
            productId: this.productData.id,
          }
          delete cartData.id;
          this.product.addToCart(cartData).subscribe((result) => {
            if (result) {
              alert('Item added to cart');
            }
          });
        }
      }
    }
  }

  removeFromCart(productId: string) {
    if (this.productData && this.productData.id) {
      this.product.removeItemFromCart(this.productData.id);
      this.removeCart = false;
    }
  }
}
