import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HistoryService } from '../history.service';
import { UsersService } from '../users.service';
import { HistoryItemWithId } from '../models/history.model';
import { HistoryItemDialogComponent } from '../components/history-item-dialog/history-item-dialog.component';
import { ShopHelper } from '../shop.helper';
import { UserWithId } from '../models/user.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit {
  isLoading: boolean = true;

  isAdmin: () => boolean = ShopHelper.isAdmin;

  users: UserWithId[] = [];

  userId: string = '';

  historyItems: HistoryItemWithId[] = [];

  filteredItems: HistoryItemWithId[] = [];

  usersForm!: FormControl;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private historyService: HistoryService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      if (this.isAdmin()) {
        this.getUsers();
      } else {
        this.fetchUserHistory();
      }
    });
    this.usersForm = new FormControl('');
  }

  fetchHistory() {
    this.historyService.getHistory().subscribe((items) => {
      this.historyItems = items;
      if (this.usersForm.value) {
        this.filteredItems = this.historyItems.filter((item) => {
          return item.userId === this.usersForm.value;
        });
      } else {
        this.filteredItems = items;
      }
      this.isLoading = false;
      2;
    });
  }

  fetchUserHistory() {
    this.historyService.getUserHistory(this.userId).subscribe((items) => {
      this.historyItems = items;
      this.filteredItems = items;
      this.isLoading = false;
    });
  }

  openHistoryItemDialog(historyItem: HistoryItemWithId) {
    const totalPrice = this.getTotalPrice(historyItem);
    const dialogRef = this.dialog.open(HistoryItemDialogComponent, {
      data: { historyItem, totalPrice },
      minWidth: '20%',
    });
  }

  onCategoryChange() {
    if (this.usersForm.value) {
      this.filteredItems = this.historyItems.filter((item) => {
        return item.userId === this.usersForm.value;
      });
    } else {
      this.filteredItems = this.historyItems;
    }
  }

  getTotalPrice(item: HistoryItemWithId) {
    let totalPrice = 0;
    item.order.forEach((product) => {
      totalPrice = totalPrice + product.amount * product.priceOfProduct;
    });
    return totalPrice;
  }

  getDate(date: Date) {
    return new Date(date).toLocaleDateString('en-GB');
  }

  getUsers() {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.fetchHistory();
    });
  }

  getUserLogin(userId: string) {
    return this.users.find((user) => user._id === userId)?.login;
  }
}
