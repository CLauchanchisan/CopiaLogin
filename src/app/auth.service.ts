import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';//proporciona métodos para la autenticación con Firebase.

import { Router } from '@angular/router';//permite la navegación entre diferentes rutas después de la autenticación.

// import {signOut, Auth} from '@angular/fire/auth'
import firebase from 'firebase/compat/app';//??

import {GoogleAuthProvider} from 'firebase/auth'//se usa para autenticar a los usuarios a través de Google.


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) 
  //Aquí se inyectan AngularFireAuth y Router para su uso en los métodos del servicio.
  {}

   /**
   * @function register
   * @description Este método permite registrar un nuevo usuario con su correo y contraseña.
   */
  async register(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return userCredential.user; // Retorna el usuario registrado
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error; // Lanza el error para manejarlo en el componente si no es exitoso
    }
  }
  /**
   * @function login
   * @description Este método autentica a un usuario con su correo y contraseña
   */
  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return userCredential.user; // Retorna el usuario autenticado
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }
  /**
   * @function logout
   * @description Este método cierra la sesión del usuario. Tras cerrar sesión, redirige al usuario a la página de inicio de sesión (/login). Si ocurre un error, lo registra en la consola.
   */
  async logout() {
    // try {
    //   await this.afAuth.signOut();
    // } catch (error) {
    //   console.error('Error al cerrar sesión:', error);
    // }
    //pruebas de login
    return this.afAuth
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

   /**
   * @function getUser
   * @description Método para obtener el estado de autenticación del usuario
   * Este método devuelve un Observable con el estado de autenticación del usuario. 
   */
  getUser() {
    // if (this.afAuth.authState) {
    //   this.router.navigate(['/login']);
    // }//mas pruebas
    return this.afAuth.authState; // Retorna un observable con el estado del usuario
  }

  /**
   * @function loginWithGoogle
   * @description Poder loguearse con Google
   * Este método permite iniciar sesión con Google usando una ventana emergente.
   */
  loginWithGoogle(){
    return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then((res: any) => {this.router.navigate([''])});
   }
}

