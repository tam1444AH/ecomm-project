import { CanActivateFn } from '@angular/router';
import { SellerService } from './services/seller.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): boolean | Observable<boolean>  => {
  const sellerService = inject(SellerService);
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('seller')) {
      return true;
    }
  }
  return sellerService.isSellerLoggedIn.asObservable();
};
