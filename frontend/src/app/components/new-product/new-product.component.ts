import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
})
export class NewProductComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<NewProductComponent>
  ) {}

  productForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    categories: new FormControl([]),
    description: new FormControl(''),
  });

  categoryList: string[] = [];

  ngOnInit(): void {
    this.fetchCategories();
  }

  fetchCategories() {
    this.productsService.getCategories().subscribe({
      next: (categories) => {
        categories.forEach((category) => {
          this.categoryList.push(category.name);
        });
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  onSubmit(newProduct: Product) {
    this.productsService.addProduct(newProduct).subscribe({
      next: () => {
        console.log('leci');
        this.onClose();
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  onClose() {
    this.dialogRef.close();
  }
}
