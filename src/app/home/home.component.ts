import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../service/weather-api.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  aeropuertos: any;
  icao: string = '';

  constructor(
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
  }
}
