import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.scss'],
})
export class BuyDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  onBuy() {
    window.alert('Bought');
    this.data.fun();
  }
}
