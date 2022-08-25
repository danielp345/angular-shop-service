import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartProductWithId } from 'src/app/models/cartProduct.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from 'src/app/products.service';
import { CartService } from 'src/app/cart.service';
import { ShopHelper } from 'src/app/shop.helper';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  isEditing: boolean = false;

  repeatedProducts: CartProductWithId[] = [];

  isAdmin: () => boolean = ShopHelper.isAdmin;
  isUser: () => boolean | string = ShopHelper.isUser;

  cartForm!: FormControl;

  productForm!: FormGroup;
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<ProductItemComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  categoryList: string[] = [];

  ngOnInit(): void {
    this.checkIfExist(this.product._id);
    this.fetchCategories();
    this.productForm = this.formBuilder.group({
      title: new FormControl(this.product.title),
      price: new FormControl(this.product.price),
      categories: new FormControl(this.product.categories),
      description: new FormControl(this.product.description),
    });
    this.cartForm = new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]);
  }

  fetchCategories() {
    this.productsService.getCategories().subscribe((categories) =>
      categories.forEach((category) => {
        this.categoryList.push(category.name);
      })
    );
  }

  onEdit() {
    this.isEditing = true;
  }

  onSubmit() {
    const updateProduct = {
      _id: this.product._id,
      ...this.productForm.value,
    };
    this.productsService
      .updateProduct(updateProduct, this.product._id)
      .subscribe({
        next: () => {},
        error: (error) => {
          alert(error.error.message);
        },
        complete: () => {
          this.isEditing = false;
        },
      });
  }

  onRemove() {
    this.productsService.deleteProduct(this.product._id).subscribe({
      next: () => {
        this.onClose();
      },
      error: (error) => {
        alert(error.error.message);
      },
      complete: () => {
        this.isEditing = false;
      },
    });
  }

  checkIfExist(productId: string) {
    this.cartService.getCartProducts().subscribe((response) => {
      this.repeatedProducts = response.filter(
        (element) => element.productId === productId
      );
    });
  }

  onAdd() {
    if (!this.isUser()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.cartForm.valid) {
      const userId = localStorage.getItem('userId');
      if (this.repeatedProducts.length === 0 && userId) {
        const newCartProduct = {
          productId: this.product._id,
          userId: userId,
          title: this.product.title,
          amount: this.cartForm.value,
          priceOfProduct: this.product.price,
        };
        this.cartService
          .addCartProduct(newCartProduct)
          .subscribe(() => this.router.navigate(['/cart/' + userId]));
      } else if (this.repeatedProducts[0]._id) {
        const id = this.repeatedProducts[0]._id;
        const oldAmount = this.repeatedProducts[0].amount;
        const updatedCartProduct = {
          ...this.repeatedProducts[0],
          amount: this.cartForm.value + oldAmount,
        };
        this.cartService.updateCartProduct(id, updatedCartProduct).subscribe({
          next: () => {
            this.router.navigate(['/cart/' + userId]);
          },
          error: (error) => {
            alert(error.error.message);
          },
        });
      }
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
