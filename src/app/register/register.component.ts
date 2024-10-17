/**import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService) {}

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
*/

// // register.component.ts
// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss'],
// })
// export class RegisterComponent {
//   email!: string;
//   password!: string;
//   errorMessage: string = ''; // Agrega esta línea

//   constructor(private authService: AuthService) {}

//   async register() {
//     try {
//       const user = await this.authService.register(this.email, this.password);
//       console.log('Usuario registrado:', user);
//       // Redirigir al usuario o mostrar un mensaje de éxito
//       this.errorMessage = ''; // Reinicia el mensaje de error si se registra correctamente
//     } catch (error) {
//       console.error('Error al registrarse:', error);
//       this.errorMessage = 'Error al registrarse. Intenta nuevamente.'; // Muestra el mensaje de error
//     }
//   }
// seleccionar control +k+ u}

// register.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email!: string;
  password!: string;
  confirmPassword!: string; // Nueva propiedad para la confirmación de contraseña
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  // async presentarToast(mensage: string) {
  //   let toast = await this.toastController.create({
  //     message: mensage,
  //     duration: 3000,
  //   });
  //   toast.present();
  // }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Usuario creado exitosamente!',
      duration: 3000,
    });

    loading.present();
  }

  async register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.'; // Validación de coincidencia
      this.successMessage = '';
      return;
    }

    try {
      const user = await this.authService.register(this.email, this.password);
      console.log('Usuario registrado:', user?.email);
      // this.successMessage = '¡Registro exitoso! Puedes iniciar sesión ahora.';
      // this.errorMessage = '';
      this.showLoading();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);

      // Oculta el mensaje de éxito después de 3 segundos
      // setTimeout(() => {
      //   this.successMessage = '';
      // }, 3000);
    } catch (error) {
      console.error('Error al registrarse:', error);
      this.errorMessage = 'Error al registrarse. Intenta nuevamente.';
      this.successMessage = '';
    }
  }
}
