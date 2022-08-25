import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryWithId } from 'src/app/models/category.model';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {
  categories: CategoryWithId[] = [];

  categoryForm!: FormControl;

  constructor(
    private productsService: ProductsService,
    public dialogRef: MatDialogRef<NewCategoryComponent>
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    this.categoryForm = new FormControl('', [Validators.required]);
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

  onDelete(id: string) {
    this.productsService.deleteCategory(id).subscribe({
      next: () => {
        this.fetchCategories();
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const newCategory = { name: this.categoryForm.value };
      this.productsService.addCategory(newCategory).subscribe({
        next: () => {
          this.fetchCategories();
        },
        error: (error) => {
          alert(error.error.message);
        },
      });
      this.categoryForm.reset();
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
