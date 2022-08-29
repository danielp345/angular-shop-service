import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductItemComponent } from '../product-item/product-item.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { ProductsService } from 'src/app/products.service';
import { ShopHelper } from 'src/app/shop.helper';
import { Category } from 'src/app/models/category.model';
import { FormControl } from '@angular/forms';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  isLoading: boolean = true;

  products: Product[] = [];

  filteredProducts: Product[] = [];

  categories: Category[] = [];

  isAdmin: () => boolean = ShopHelper.isAdmin;

  categoriesForm!: FormControl;

  constructor(
    public dialog: MatDialog,
    private productsService: ProductsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.fetchProducts();
    this.fetchCategories();
    this.categoriesForm = new FormControl('');
  }

  getUser() {
    this.usersService.getAuthUser().subscribe({
      next: (res) => {
        localStorage.setItem('userLogin', res.user._doc.login);
        localStorage.setItem('userId', res.user._doc._id);
        localStorage.setItem('isAdmin', res.user._doc.isAdmin.toString());
        localStorage.setItem('token', res.token);
      },
      error: (error) => {},
    });
  }

  fetchProducts() {
    this.productsService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      if (this.categoriesForm.value) {
        this.filteredProducts = this.products.filter((product) => {
          return product.categories.includes(
            this.categoriesForm.value.toString()
          );
        });
      } else {
        this.filteredProducts = products;
      }
      this.isLoading = false;
    });
  }

  fetchCategories() {
    this.productsService.getCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  onCategoryChange() {
    if (this.categoriesForm.value) {
      this.filteredProducts = this.products.filter((product) => {
        return product.categories.includes(
          this.categoriesForm.value.toString()
        );
      });
    } else {
      this.filteredProducts = this.products;
    }
  }

  openDialog(product: Product) {
    const dialogRef = this.dialog.open(ProductItemComponent, {
      data: product,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchProducts();
      // this.categoriesForm.reset();
    });
  }

  openNewProductDialog() {
    const dialogRef = this.dialog.open(NewProductComponent, { width: '50%' });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchProducts();
      // this.categoriesForm.reset();
    });
  }

  openNewCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, { width: '50%' });
  }
}
