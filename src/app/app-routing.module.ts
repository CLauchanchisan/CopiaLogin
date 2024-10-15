import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//tratar de que se vean separados
import { LoginComponent } from './login/login.component'; // Asegúrate de importar el LoginComponent
import { RegisterComponent } from './register/register.component';


/** 
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login', // Ruta para el componente de login
    component: LoginComponent // Especifica que el componente a cargar es LoginComponent
  },
  {
    path: '',
    redirectTo: 'login', // Redirige a login en lugar de home
    pathMatch: 'full'
  },
];
*/

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirigir al login por defecto
  // Otras rutas
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

