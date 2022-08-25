import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-history-item-dialog',
  templateUrl: './history-item-dialog.component.html',
  styleUrls: ['./history-item-dialog.component.scss'],
})
export class HistoryItemDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<HistoryItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }
}
