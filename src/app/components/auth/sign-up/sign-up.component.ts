import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Citizenship } from 'src/app/models/citizenship';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CitizenshipService } from 'src/app/services/citizenship.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  citizenships: Citizenship[];
  form: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'ok';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private citizenshipsService: CitizenshipService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initAuthForm();
    this.citizenshipsService.get().subscribe((cs: Citizenship[]) => {
      this.citizenships = cs;
    });
  }

  private _initAuthForm() {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      nickname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', Validators.required],
      citizenship: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.form?.invalid) return;
    else if(this.passwordMatchValidator()) return;

    this.authService
      .register(
        this.getAuthForm?.['first_name'].value,
        this.getAuthForm?.['last_name'].value,
        this.getAuthForm?.['nickname'].value,
        this.getAuthForm?.['password'].value,
        this.getAuthForm?.['citizenship'].value
      )
      .subscribe(
        () => {
          this.router.navigateByUrl('/auth/login');
        },
        () => {
          this.authError = true;
          this.authMessage = 'error occurs in tte server';
        }
      );
  }

  passwordMatchValidator(){
    return this.getAuthForm?.['password'].value === this.getAuthForm?.['confirm_password'].value
      ? null : { mismatch: true };
  }
  get getAuthForm() {
    return this.form?.controls;
  }

  // get first_name() { return this.getAuthForm?.['first_name'].value; }
  // get email() { return this.form.get('email'); }
  // get password() { return this.form.get('password'); }
  // get confirmPassword() { return this.form.get('confirmPassword');
}
