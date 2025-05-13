import { Component } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgbCarouselModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularProducts: Product[] | undefined;
  trendyProducts: Product[] | undefined;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  constructor(private product: ProductService) { }

  ngOnInit() {
    this.product.popularProducts().subscribe((result) => {
      if (result) {
        this.popularProducts = result;
      }
    });
    this.product.trendyProducts().subscribe((result) => {
      if (result) {
        this.trendyProducts = result;
      }
    });
  }
}
