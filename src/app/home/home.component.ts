import { Component, OnInit } from '@angular/core';

//api
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
  //se agrego para el gps
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

  //se agrego para el gps
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

  ngOnInit() {
    this.obtenerUbicacion(); // Llama a obtener ubicación al iniciar el componente/se agrego para el gps
    
    // Actualiza la ubicación cada media hora (1800000 ms)/se agrego para el gps
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

    this.cargarFavoritos(); // Cargar los favoritos al iniciar el componente
  }

  ionViewWillEnter() {
    // Se ejecuta cada vez que el usuario vuelve a la vista
    this.actualizarEstadoFavoritos(); // Actualiza el estado de favoritos al regresar
  }

  //deberia ayudar a remover la estrella
  cargarFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    favoritos.forEach((fav: any) => {
      this.isFavorite[fav.icao] = true; // Marca como favorito
    });
  }

  /**
   * @function addToFavorites
   * @description se ejecuta cuando el usuario haga click en la estrella de favoritos
   * guarda el aeropuerto en el localstorage
  */

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

  actualizarEstadoFavoritos() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.aeropuertos?.data.forEach((aeropuerto: any) => {
      this.isFavorite[aeropuerto.icao] = favoritos.some((fav: any) => fav.icao === aeropuerto.icao);
    });
  }

  //favoritos
  addToFavorites(aerop: Aerop) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const favorito = {
      name: aerop.station.name,
      icao: aerop.icao,
    };

    if (!favoritos.some((fav: any) => fav.icao === aerop.icao)) {
      favoritos.push(favorito);
      this.isFavorite[aerop.icao] = true; // Actualizar el estado local
    } else {
      favoritos = favoritos.filter((fav: any) => fav.icao !== aerop.icao);
      this.isFavorite[aerop.icao] = false; // Actualizar el estado local
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

  //funcion para traer aeropuertos desde la api
  async buscarAeropuertoMasCercano(latitud: number, longitud: number) {
    try {
      const response = await axios.get(`https://api.checkwx.com/station/lat/${latitud}/lon/${longitud}`, {
        headers: {
          'X-API-Key': "ca21f8d774f04976b299456461" // Reemplaza con tu clave API real api key clau
        }
      });

      console.log('Respuesta de la API:', response.data); // Verifica la respuesta, saber si funciona lo que esta haciendo, se muestra por consola

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



// Añadido ionViewWillEnter():

// Este método se ejecuta cada vez que el usuario regresa a la página. Al llamarlo, actualizas el estado de los favoritos.
// Llamada a actualizarEstadoFavoritos():

// Dentro de ionViewWillEnter(), se llama a este método para que se asegure de que el estado de isFavorite esté actualizado al regresar a la página de inicio.
