import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-update-product',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent {
  productData: undefined | Product;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute, private product: ProductService) {}

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product.getProduct(productId).subscribe((result) => {
        console.warn(result);
        this.productData = result;
      });
    }
  }

  submit(data: Product) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if (result) {
        console.warn(result);
        this.productMessage = 'Product updated successfully';
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}
