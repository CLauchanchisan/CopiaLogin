import { Component } from '@angular/core';

import { AuthService } from '../auth.service';//Servicio que contiene la lógica para registrar usuarios.

import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
//Propiedades del Componente
export class RegisterComponent {
  email!: string;
  password!: string;
  confirmPassword!: string; // Nueva propiedad para la confirmación de contraseña
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) { }

  /**
 * @function showLoading
 * @description Cartel de aviso de creacion exitosa de usuario 
 */
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Usuario creado exitosamente!',
      duration: 3000,
    });
    await loading.present();
  }
  /**
 * @function showToast
 * @description Este método muestra una notificación (toast) con un mensaje personalizado y un color que indica si fue un éxito o un error (danger para errores y success para éxito).
 */
  async showToast(message: string, color: 'danger' | 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }

  /**
 * @function register
 * @description Registro de usuario y validacion de contraseñas
 * Intenta registrar al usuario usando authService.register. Si el registro es exitoso, llama a showLoading() y redirige al usuario a la página de inicio de sesión (/login) después de 3 segundos.
 * Si hay un error durante el registro, se muestra un mensaje de error con showToast.
 */
  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.'; // Validación de coincidencia
      this.successMessage = '';
      return;
    }
    try {
      const user = await this.authService.register(this.email, this.password);
      console.log('Usuario registrado:', user?.email);
      this.showLoading();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

    } catch (error) {
      console.error('Error al registrarse:', error);
      this.showToast('Ingrese un mail válido', 'danger');
    }
  }
}
