import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { signUp } from '../data-type';
import { Router } from '@angular/router';
@Component({
  selector: 'app-seller-auth',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css'
})
export class SellerAuthComponent {
  ngOnInit(): void {
    this.seller.reloadSeller();
  }
  constructor(private seller: SellerService) { }
  signUp(data: signUp): void {
    console.warn(data);
    this.seller.userSignUp(data);
  }
}
