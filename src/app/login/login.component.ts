import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

//Este componente LoginComponent permite iniciar sesión con correo electrónico y contraseña, así como con Google. También maneja la retroalimentación visual para el usuario en función de si el inicio de sesión fue exitoso o no.

export class LoginComponent {
  email!: string;
  password!: string;
  successMessage: string = ''; // Almacena el mensaje de éxito para mostrar cuando el inicio de sesión es exitoso.
  errorMessage: string = '';//Almacena el mensaje de error en caso de que falle el inicio de sesión.


  constructor(private authService: AuthService,
    private loadingController: LoadingController,
    private router: Router
  ) { }

   /**
  * @function showLoading
  * @description Cartel de logueo exitoso
  * muestra un mensaje de carga cuando el usuario ha iniciado sesión con éxito.
  */
  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Logueado correctamente! Aguarde',
      duration: 1000,
    });

    loading.present();
  }

  /**
  * @function login
  * @description Contiene los mensajes de exito y error cuando logueamos nuestros usuarios
  * intenta iniciar sesión con authService.login, usando el email y contraseña del usuario.
  */
  async login() {
    try {
      const user = await this.authService.login(this.email, this.password);
      console.log('Usuario logueado:', user);
      // Redirigir al usuario o mostrar un mensaje aquí

      this.successMessage = '¡Usuario logueado con éxito!'; // Mensaje de éxito
      // Llama a showLoading y redirige al usuario a la página de inicio (/home)
      this.showLoading();
      this.router.navigate(['/home']);

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

  /**
 * @function onClick
 * @description Metodo para poder Loguear con Google
 */
  onClick() {
    this.authService
      .loginWithGoogle()
      // .then((response) => {
      //   this.router.navigate(['']);
      // })
      // .catch((error) => console.log(error));
  }
}