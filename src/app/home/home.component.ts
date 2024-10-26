import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../service/weather-api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

interface Aerop {
  station: {
    name: string;
  };
  icao: string;
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
    // if (this.icao === '') {
    // } else {

    // }
  }

  // ngOnInit() {
  //   this.router.navigate(['/login']);
  //   // this.auth.getUser().subscribe((res) => {
  //   //   if (res === null) {
  //   //     console.log('ENTRO IF: ' + res);
  //   //     this.router.navigate(['/login']);
  //   //   } else {
  //   //     console.log('NO ENTRO IF:' + res);
  //   //   }
  //   // });

    
  // }

  ngOnInit() {
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
   * 
   * @param aerop 
   */
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

}
