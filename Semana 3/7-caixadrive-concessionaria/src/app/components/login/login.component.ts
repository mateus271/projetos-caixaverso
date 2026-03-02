import { inject, OnInit, signal } from '@angular/core';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../interfaces/usuario.interface';

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
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, Validators.required),
    password: new FormControl<string | null>(null, Validators.required)
  });

  public isPasswordVisible: boolean = false;

  public listaUsuarios = signal<Usuario[]>([]);

  public estaLogado: boolean = false;

  public usuarioService = inject(UsuariosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.armazenarUsuarios();

    this.verificarLogin();
  }

  public login(): void {
    const inputEmail = this.loginForm.get("email")?.value ?? "";
    const password = this.loginForm.get("password")?.value ?? "";

    const usuarioNoArray = this.listaUsuarios().find(usuario => usuario.email === inputEmail);

    if (usuarioNoArray && usuarioNoArray.password === password) {
      this.openSnackBar("Login bem-sucedido! Redirecionando à página inicial");
      localStorage.setItem("logado", "true");
      localStorage.setItem("role", usuarioNoArray.role);
      this.router.navigate(["catalogo"]);
    } else {
      this.openSnackBar("Usuário ou senha incorreto! Por favor tente novamente");
      this.loginForm.reset();
    }
  }

  public logout(): void {
    localStorage.setItem("logado", "false");
    localStorage.setItem("role", "");
    window.location.reload();
  }

  private armazenarUsuarios(): void {
    const usuariosBuscados = this.route.snapshot.data['listaUsuarios'];

    if (usuariosBuscados) {
      this.listaUsuarios.set(usuariosBuscados);
    }
  }

  private verificarLogin(): void {
    this.estaLogado = localStorage.getItem("logado") === "true";
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message);
  }
}
