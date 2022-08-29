import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { Category } from './models/category.model';

const productsUrl = '/api/products';
const categoriesUrl = '/api/categories';
const url = '';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }

  public addProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.post<Product>(productsUrl, product, requestOptions);
  }

  public updateProduct(product: Product, id: string): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.put<Product>(
      `${productsUrl}/${id}`,
      product,
      requestOptions
    );
  }

  public deleteProduct(id: string): Observable<Category[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.delete<Category[]>(`${productsUrl}/${id}`, requestOptions);
  }

  public getCategories(): Observable<any[]> {
    return this.http.get<any[]>(categoriesUrl);
  }

  public addCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.post<Category>(categoriesUrl, category, requestOptions);
  }

  public deleteCategory(id: string): Observable<Category> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.delete<Category>(`${categoriesUrl}/${id}`, requestOptions);
  }
}
