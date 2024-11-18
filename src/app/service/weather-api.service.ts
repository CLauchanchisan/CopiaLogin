import { HttpClient } from '@angular/common/http';// Es el cliente HTTP de Angular que permite hacer solicitudes HTTP a servidores externos.
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  apiKey: any = 'a1557e78eade4665b44fa164f6';
  nombre?: string;

  constructor(public http: HttpClient) {}
  //Aquí se inyecta HttpClient, el cual se usa para realizar las solicitudes HTTP. Declararlo como public hace que esté disponible en los métodos del servicio.

  /**
 * @function obtenerDatos
 * @description Obtener datos a traves de la API
 */
  obtenerDatos(icao: string) {
    return this.http.get(
      'https://api.checkwx.com/metar/' + icao + '/decoded?x-api-key=' + this.apiKey
    );
  }
}


// Parámetro: Recibe icao, el código del aeropuerto.
// URL de la solicitud: Construye la URL con el código ICAO y la clave de API.
// Solicitud HTTP: Usa this.http.get(...) para enviar una solicitud GET a la API de CheckWX, obteniendo datos meteorológicos decodificados para el aeropuerto especificado.
// Resumen
