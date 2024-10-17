import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../service/weather-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit {

  aeropuertos: any;
  icao: string = '';

  constructor(
    public api: WeatherApiService
  ) { }

  buscar(event: any) {
    this.icao = event.detail.value;
    if (this.icao === '') {
    } else {
      this.api.obtenerDatos(this.icao).subscribe(
        (data) => {
          this.aeropuertos = data;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit() {}

}
