import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  });

  public isPasswordVisible: boolean = false;

  public login(): void {
    const username = this.loginForm.get("username")?.value ?? "";
    const password = this.loginForm.get("password")?.value ?? "";

    // this.authService.login(username, password).subscribe({
    //   next: () => {
    //     this.openSnackBar("Login bem-sucedido! Redirecionando à página inicial");
    //     this.router.navigate(["home"]);
    //   },
    //   error: () => {
    //     this.openSnackBar("Aconteceu algum problema no login! Cheque as credenciais e tente novamente");
    //   }
    // });
  }
}
