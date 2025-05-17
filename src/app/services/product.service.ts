import { EventEmitter, Injectable } from '@angular/core';
import { Cart, Order, Product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartData = new EventEmitter<Product[] | []>();

  constructor(private http: HttpClient) { }
  addProduct(data: Product) {
    return this.http.post('http://localhost:3000/products', data);
  }

  productList() {
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  deleteProduct(id: string) {
    return this.http.delete('http://localhost:3000/products/' + id);
  }

  getProduct(id: string) {
    return this.http.get<Product>('http://localhost:3000/products/' + id);
  }

  updateProduct(data: Product) {
    return this.http.put<Product>('http://localhost:3000/products/' + data.id, data);
  }

  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=8');
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>('http://localhost:3000/products?q=' + query);
  }

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart;
    if (typeof window !== 'undefined') {
      localCart = localStorage.getItem('localCart');
    }

    if (!localCart) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('localCart', JSON.stringify([data]));
        this.cartData.emit([data]);
      }
    } else {
      console.warn('You already have data.');
      cartData = JSON.parse(localCart);
      cartData.push(data);
      if (typeof window !== 'undefined') {
        localStorage.setItem('localCart', JSON.stringify(cartData));
      }
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: string) {
    let cartData;
    if (typeof window !== 'undefined') {
      cartData = localStorage.getItem('localCart');
    }
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id.toString());
      if (typeof window !== 'undefined') {
        localStorage.setItem('localCart', JSON.stringify(items));
      }
      this.cartData.emit(items);
    }
  }
  
  addToCart(cartData: Cart) {
    return this.http.post('http://localhost:3000/cart', cartData);
  }

  getCartList(userId: string) {
    return this.http.get<Product[]>(`http://localhost:3000/cart?userId=${userId}`, {
      observe: 'response',
    }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }

  removeCartItem(cartId: string) {
    return this.http.delete('http://localhost:3000/cart/' + cartId);
  }

  currentCart() : Observable<Cart[]> {
    const raw = 
      typeof window !== 'undefined'
        ? localStorage.getItem('user')
        : null;
    const user = raw ? JSON.parse(raw) : null;

    if (user && user.id) {
      return this.http.get<Cart[]>(
        `http://localhost:3000/cart?userId=${user.id}`
      );
    } else {
      return of([]);
    }
  }

  orderNow(data: Order) {
    return this.http.post('http://localhost:3000/orders', data);
  }

}
