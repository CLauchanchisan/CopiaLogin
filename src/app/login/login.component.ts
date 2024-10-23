/**import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  async login() {
    try {
      const user = await this.authService.login(this.email, this.password);
      console.log('Usuario logueado:', user);
      // Aquí puedes redirigir al usuario o mostrar un mensaje
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Maneja el error, muestra un mensaje, etc.
    }
  }

  async register() {
    try {
      const user = await this.authService.register(this.email, this.password);
      console.log('Usuario registrado:', user);
      // Aquí puedes redirigir al usuario o mostrar un mensaje
    } catch (error) {
      console.error('Error al registrarse:', error);
      // Maneja el error, muestra un mensaje, etc.
    }
  }
}
**/

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email!: string;
  password!: string;
  successMessage: string = ''; // Agregar propiedad para el mensaje de éxito
  errorMessage: string = '';


  constructor(private authService: AuthService,
    private loadingController: LoadingController,
    private router: Router
  ) {}
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Logueado correctamente! Aguarde',
      duration: 1000,
    });

    loading.present();
  }

  async login() {
    try {
      const user = await this.authService.login(this.email, this.password);
      console.log('Usuario logueado:', user);
      // Redirigir al usuario o mostrar un mensaje aquí

      this.successMessage = '¡Usuario logueado con éxito!'; // Mensaje de éxito
      // Aquí puedes redirigir al usuario o hacer lo que necesites
      this.showLoading();
      this.router.navigate(['/home']);
      
      // setTimeout(() => {
      // }, 3000);
      
      
      // Ocultar el mensaje después de 3 segundos
      setTimeout(() => {
        this.router.navigate(['/home'])
      }, 3000);
      
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.errorMessage = 'error de usuario/contraseña'
      // Manejo de errores
    }
  }

  onClick() {
    this.authService
      .loginWithGoogle()
      .then((response) => {
        this.router.navigate(['']);
      })
      .catch((error) => console.log(error));
  }
}


