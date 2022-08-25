import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartProduct, CartProductWithId } from './models/cartProduct.model';

const cartUrl = '/api/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  public getCartProducts(): Observable<CartProductWithId[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.get<CartProductWithId[]>(cartUrl, requestOptions);
  }

  public addCartProduct(product: CartProduct): Observable<CartProduct> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.post<CartProduct>(cartUrl, product, requestOptions);
  }

  public updateCartProduct(
    id: string,
    cartProduct: CartProduct
  ): Observable<CartProduct> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.put<CartProduct>(
      `${cartUrl}/${id}`,
      cartProduct,
      requestOptions
    );
  }

  public deleteCartProduct(id: string): Observable<CartProductWithId> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    const requestOptions = { headers: headers };
    return this.http.delete<CartProductWithId>(
      `${cartUrl}/${id}`,
      requestOptions
    );
  }
}
