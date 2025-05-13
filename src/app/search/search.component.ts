import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResult: Product[] | undefined;
  constructor(private activeRoute: ActivatedRoute, private product: ProductService) {}
  ngOnInit() {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    if (query) {
      this.product.searchProducts(query).subscribe((result) => {
        if (result.length > 0) {
          this.searchResult = result;
        }
        else {
          this.searchResult = undefined;
        }
      });
    }
  }
}
