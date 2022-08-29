import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserWithId } from '../models/user.model';
import { UsersService } from '../users.service';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';
import { ShopHelper } from '../shop.helper';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  id: string = '';

  user: UserWithId = {
    _id: '',
    login: '',
    password: '',
  };

  userForm!: FormGroup;

  isAdmin: () => boolean = ShopHelper.isAdmin;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      // this.getUser();
    });
    this.userForm = this.formBuilder.group({
      login: new FormControl(this.user.login),
    });
  }

  getUser() {
    this.usersService.getUserById(this.id).subscribe((user) => {
      this.user = user;
    });
  }

  openChangePasswordDialog(user: UserWithId) {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: user,
      width: '30%',
    });
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }
}
