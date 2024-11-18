import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//tratar de que se vean separados Login y registro
import { LoginComponent } from './login/login.component'; // Asegúrate de importar el LoginComponent
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';

//En este arreglo de rutas (routes), se especifica qué componente debe mostrarse para cada ruta. Cada objeto en el arreglo tiene:
// path: La URL de la ruta.
// component: El componente que se debe cargar para esa URL.

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},//Esta es una ruta por defecto que redirige a /home si el usuario navega a la raíz de la aplicación (pathMatch: 'full' asegura que redirige solo cuando la URL está vacía).
  
  { path: 'favorites', component: FavoritesComponent }
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }): Esta línea indica que las rutas se cargarán con la estrategia PreloadAllModules, lo cual significa que los módulos de la aplicación se precargarán en segundo plano después de que se haya cargado la aplicación principal.
// exports: [RouterModule]: Permite que RouterModule esté disponible para el resto de la aplicación.