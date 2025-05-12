import { Injectable } from '@angular/core';
import { Product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  addProduct(data: Product) {
    console.warn("Service called");
    return this.http.post('http://localhost:3000/products', data);
  }
}
