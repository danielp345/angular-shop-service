import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/products.service';
import { ShopHelper } from 'src/app/shop.helper';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userId = localStorage.getItem('userId');

  isAdmin: () => boolean = ShopHelper.isAdmin;

  isUser: () => boolean | string = ShopHelper.isUser;

  constructor(
    private router: Router,
    public productService: ProductsService,
    private usersService: UsersService
  ) {}

  onLogout() {
    this.usersService.logoutUser().subscribe({
      next: (res) => {
        this.onNavigate('/');
      },
    });
  }

  onNavigate(link: string) {
    this.router.navigate([link]);
  }

  idNavigate(place: string) {
    const id = localStorage.getItem('userId');
    this.onNavigate('/' + place + '/' + id);
  }
}
