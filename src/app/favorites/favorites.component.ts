import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

interface Favorito {
  name: string;
  icao: string;
}


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent  implements OnInit {

  favoritos: Favorito[] = [];
  //icao: string = '';
  
  constructor(private router: Router,private dataService: DataService) { }

  ngOnInit() {
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  /**
   * @function goHome
   * @description Navega a la pagina de inicio desde favoritos
   */
  goHome() {
    this.router.navigate(['/home']);
  }

  /**
   * @function eliminarFavorito
   * @description Elimina el favorito de la lista y actualiza el localStorage
   */
  eliminarFavorito(favorito: Favorito) {
    this.favoritos = this.favoritos.filter(fav => fav.icao !== favorito.icao);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  /**
   * @function verFavorito
   * @description navega al home y autocompleta el icao de busqueda, para ver el favorito
   */
  verFavorito(icao: string) {
    this.dataService.changeIcao(icao);  // Cambia el ICAO en el servicio
    this.router.navigate(['/home']);   // Luego navega a home
  }

}
