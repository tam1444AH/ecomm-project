import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) { }
  productData: Product | undefined;
  ngOnInit() {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if (id) {
      this.product.getProduct(id).subscribe((result) => {
        if (result) {
          this.productData = result;
        }
      });
    }
  }
}
