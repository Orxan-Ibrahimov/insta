import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocaleStorageService } from 'src/app/services/locale-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: LocaleStorageService
  ) {}
  ngOnInit(): void {
    this._initAuthForm();
  }

  private _initAuthForm() {
    this.form = this.formBuilder.group({
      nickname: ['Okus', Validators.required],
      password: ['Okus', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form?.invalid) return;

    this.authService
      .login(
        this.getAuthForm?.['nickname'].value,
        this.getAuthForm?.['password'].value
      )
      .subscribe(
        (response: User) => {
          this.tokenStorage.setItem(response['token']);
          this.router.navigateByUrl('/home');
        },
        () => {
          this.authError = true;
          this.authMessage = 'error occurs in tte server';
        }
      );
  }

  get getAuthForm() {
    return this.form?.controls;
  }
}
