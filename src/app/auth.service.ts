import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  // Método para registrar un nuevo usuario
  async register(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return userCredential.user; // Retorna el usuario registrado
    } catch (error) {
      console.error('Error al registrarse:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  // Método para iniciar sesión
  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      return userCredential.user; // Retorna el usuario autenticado
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  // Método para cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
    }   catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Método para obtener el estado de autenticación del usuario
  getUser() {
    return this.afAuth.authState; // Retorna un observable con el estado del usuario
  }

}



