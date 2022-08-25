import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BuyDialogComponent } from '../buy-dialog/buy-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/cart.service';
import { HistoryService } from 'src/app/history.service';
import { CartProductWithId } from 'src/app/models/cartProduct.model';
import { ShopHelper } from 'src/app/shop.helper';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  userId: string = '';

  isLoading: boolean = true;

  cartProducts: CartProductWithId[] = [];

  isAdmin: () => boolean = ShopHelper.isAdmin;
  isUser: () => boolean | string = ShopHelper.isUser;

  show: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private historyService: HistoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.fetchUserCartProducts();
    });
  }

  fetchCartProducts() {
    this.cartService
      .getCartProducts()
      .subscribe((products: CartProductWithId[]) => {
        this.cartProducts = products;
        this.isLoading = false;
      });
  }

  fetchUserCartProducts() {
    this.cartService.getCartProducts().subscribe({
      next: (res) => {
        this.cartProducts = res;
        this.isLoading = false;
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  openDialog() {
    let totalPrice = 0;
    for (let product of this.cartProducts) {
      totalPrice = totalPrice + product.amount * product.priceOfProduct;
    }
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      data: { totalPrice, fun: () => this.onBuy() },
      width: '50%',
    });
    dialogRef.afterClosed().subscribe();
  }

  onDelete(event: any, product: CartProductWithId) {
    event.stopPropagation();
    if (product._id)
      this.cartService.deleteCartProduct(product._id).subscribe({
        next: () => {
          this.fetchCartProducts();
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
  }
  onDeleteAll() {
    for (let product of this.cartProducts) {
      this.cartService.deleteCartProduct(product._id).subscribe();
    }
    this.cartProducts = [];
  }

  onBuy() {
    const orderProducts = this.cartProducts.map((product) => {
      return {
        title: product.title,
        amount: product.amount,
        priceOfProduct: product.priceOfProduct,
      };
    });
    const newHistoryItem = {
      userId: parseInt(this.userId),
      date: new Date(Date.now()),
      order: orderProducts,
    };
    this.historyService.addHistoryItem(newHistoryItem).subscribe(() => {
      this.onDeleteAll();
    });
  }
}
