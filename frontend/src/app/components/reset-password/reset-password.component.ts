import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/users.service';
import { UserWithId } from 'src/app/models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  newPasswordForm!: FormGroup;

  hide: boolean = true;

  isEnable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private user: UserWithId
  ) {}

  ngOnInit(): void {
    this.newPasswordForm = this.formBuilder.group({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.newPasswordForm.valid) {
      if (this.newPasswordForm.value.currentPassword !== this.user.password) {
        alert('Incorrect current password');
        this.newPasswordForm.reset();
        return;
      }

      if (
        this.newPasswordForm.value.newPassword !==
        this.newPasswordForm.value.confirmNewPassword
      ) {
        alert('New passwords do not match');
        return;
      }

      const updatedUser: UserWithId = {
        ...this.user,
        password: this.newPasswordForm.value.newPassword,
      };

      this.usersService.updateUser(updatedUser).subscribe(() => {
        this.newPasswordForm.reset();
        this.dialogRef.close();
      });
    }
  }
}
