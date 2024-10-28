import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../service/weather-api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

//gps
import { Geolocation } from '@capacitor/geolocation';
//ver pais y provincia
import axios from 'axios';

interface Aerop {
  station: {
    name: string;
  };
  icao: string;
  lat: number; // Añadir latitud del aeropuerto
  lon: number; // Añadir longitud del aeropuerto
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  aeropuertos: any;
  icao: string = '';
  //isFavorite: boolean = false;
  isFavorite: { [key: string]: boolean } = {};

  aerops: Aerop[] = []; // Asume que tienes una lista de aeropuertos de la API

  // Propiedades para latitud y longitud
  latitud: number | null = null;  // Aquí declaras latitud
  longitud: number | null = null;  // Aquí declaras longitud

  // Propiedades para país y provincia
  pais: string | null = null;  // Aquí declaras país
  provincia: string | null = null;  // Aquí declaras provincia

  aeropuertoCercano: Aerop | null = null; // Propiedad para el aeropuerto más cercano

  constructor(
    private dataService: DataService,
    public api: WeatherApiService,
    private auth: AuthService,
    private router: Router
  ) {}


  buscar(event: any) {
    this.icao = event.detail.value;

    this.api.obtenerDatos(this.icao).subscribe(
      (data) => {
        this.aeropuertos = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.obtenerUbicacion(); // Llama a obtener ubicación al iniciar el componente
    
    // Actualiza la ubicación cada media hora (1800000 ms)
    setInterval(() => {
      this.obtenerUbicacion();
    }, 1800000);
  
    this.auth.getUser().subscribe((res) => {
      if (!res) {
        console.log('ENTRO IF: ' + res);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, );
      } else {
        console.log('NO ENTRO IF: ' + res);
      }
    });

    // Suscríbete al ICAO en DataService
    this.dataService.currentIcao.subscribe((icao) => {
      if (icao) {
        this.icao = icao;
        this.buscar({ detail: { value: icao } });  // Llama al método de búsqueda
      }
    });

    this.auth.getUser().subscribe((res) => {
      if (!res) {
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * @function addToFavorites
   * @description se ejecuta cuando el usuario haga click en la estrella de favoritos
   * guarda el aeropuerto en el localstorage
   */

  //favoritos
  addToFavorites(aerop: Aerop) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const favorito = {
      name: aerop.station.name,
      icao: aerop.icao
    };
    if (!favoritos.some((fav: any) => fav.icao === aerop.icao)) {
      favoritos.push(favorito);
      this.isFavorite[aerop.icao] = true;
    } else {
      favoritos = favoritos.filter((fav: any) => fav.icao !== aerop.icao);
      this.isFavorite[aerop.icao] = false;
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
  }


  //gps
  async obtenerUbicacion() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitud = coordinates.coords.latitude;
      this.longitud = coordinates.coords.longitude;
      console.log('Latitud:', this.latitud);
      console.log('Longitud:', this.longitud);

      // Llama a obtenerDireccion con las coordenadas
      await this.obtenerDireccion(this.latitud, this.longitud);

      // Busca el aeropuerto más cercano
      await this.buscarAeropuertoMasCercano(this.latitud, this.longitud);
    
    } catch (error) {
      console.error('Error obteniendo la ubicación', error);
    }
  }

  // Función para obtener la dirección a partir de latitud y longitud
  async obtenerDireccion(latitud: number, longitud: number) {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat: latitud,
          lon: longitud,
          format: 'json'
        }
      });

      this.pais = response.data.address.country;
      this.provincia = response.data.address.state || response.data.address.prov;
      console.log('País:', this.pais);
      console.log('Provincia:', this.provincia);
    } catch (error) {
      console.error('Error obteniendo la dirección', error);
    }
  }

  async buscarAeropuertoMasCercano(latitud: number, longitud: number) {
    try {
      const response = await axios.get(`https://api.checkwx.com/station/lat/${latitud}/lon/${longitud}`, {
        headers: {
          'X-API-Key': "ca21f8d774f04976b299456461" // Reemplaza con tu clave API real api key clau
        }
      });

      console.log('Respuesta de la API:', response.data); // Verifica la respuesta

      if (Array.isArray(response.data) && response.data.length > 0) {
          this.aeropuertoCercano = response.data[0]; // Asume que el primer aeropuerto es el más cercano
          console.log('Aeropuerto más cercano:', this.aeropuertoCercano);
      } else {
        console.log('No se encontró ningún aeropuerto.');
      }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error('Error obteniendo el aeropuerto más cercano:', error.response ? error.response.data : error.message);
        } else {
            console.error('Error desconocido:', error);
        }
    }
 }

}






  // async buscarAeropuertoMasCercano(latitud: number, longitud: number) {
  //   try {
  //     // Suponiendo que tienes una API que devuelve una lista de aeropuertos con sus coordenadas
  //     const response = await axios.get('https://api.checkwx.com/metar/'); // Cambia esto por la URL real
  //     const aeropuertos: Aerop[] = response.data;

  //     let aeropuertoCercano: Aerop | null = null;
  //     let distanciaMinima = Infinity; // Inicializamos con infinito

  //     // Calcular la distancia
  //     for (const aerop of aeropuertos) {
  //       const distancia = this.calcularDistancia(latitud, longitud, aerop.lat, aerop.lon);
  //       if (distancia < distanciaMinima) {
  //         distanciaMinima = distancia;
  //         aeropuertoCercano = aerop;
  //       }
  //     }

  //     if (aeropuertoCercano) {
  //       console.log('Aeropuerto más cercano:', aeropuertoCercano);
  //     } else {
  //       console.log('No se encontró ningún aeropuerto.');
  //     }
  //   } catch (error) {
  //     console.error('Error obteniendo los aeropuertos', error);
  //   }
  // }

//   // Método para calcular la distancia entre dos puntos (Haversine formula)
//   calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
//     const R = 6371; // Radio de la Tierra en kilómetros
//     const dLat = this.deg2rad(lat2 - lat1);
//     const dLon = this.deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distancia = R * c; // Distancia en kilómetros
//     return distancia;
//   }

//   // Función auxiliar para convertir grados a radianes
//   deg2rad(deg: number): number {
//     return deg * (Math.PI / 180);
//   }
// }


