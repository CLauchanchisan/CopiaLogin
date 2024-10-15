import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';//Importa LoginComponent

// Importaciones de Firebase y el módulo de autenticación
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment'; // Importar la configuración de Firebase
import { FormsModule } from '@angular/forms';
//registro
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [AppComponent,LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Inicialización de Firebase
    AngularFireAuthModule, // Módulo de autenticación de Firebase
    FormsModule //Agregado cuando aparecieron los errores
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
