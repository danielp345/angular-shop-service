import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { ShopHelper } from 'src/app/shop.helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userId = localStorage.getItem('userId');

  isAdmin: () => boolean = ShopHelper.isAdmin;

  isUser: () => boolean | string = ShopHelper.isUser;

  constructor(private router: Router, public productService: ProductsService) {}

  onLogout() {
    localStorage.removeItem('userLogin');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    this.onNavigate('/');
  }

  onNavigate(link: string) {
    this.router.navigate([link]);
  }

  idNavigate(place: string) {
    const id = localStorage.getItem('userId');
    this.onNavigate('/' + place + '/' + id);
  }
}
