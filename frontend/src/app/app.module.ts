import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './components/cart/cart.component';
import { BodyComponent } from './components/body/body.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { BuyDialogComponent } from './components/buy-dialog/buy-dialog.component';
import { LoginPageComponent } from './login-page/login-page.component';

import { AuthGuard } from './auth.guard';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { HistoryItemDialogComponent } from './components/history-item-dialog/history-item-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CartComponent,
    BodyComponent,
    ProductItemComponent,
    NewProductComponent,
    NewCategoryComponent,
    BuyDialogComponent,
    LoginPageComponent,
    ProfilePageComponent,
    ResetPasswordComponent,
    HistoryPageComponent,
    HistoryItemDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot([
      { path: '', component: BodyComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: LoginPageComponent },
      {
        path: 'cart/:id',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'history/:id',
        component: HistoryPageComponent,
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: '', component: BodyComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
