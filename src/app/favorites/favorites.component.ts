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

  goHome() {
    this.router.navigate(['/home']);
  }

  /**
   * para eliminar el favorito de la lista
   * @param favoritoItem 
   */
  eliminarFavorito(favorito: Favorito) {
    this.favoritos = this.favoritos.filter(fav => fav.icao !== favorito.icao);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  verFavorito(icao: string) {
    this.dataService.changeIcao(icao);  // Cambia el ICAO en el servicio
    this.router.navigate(['/home']);   // Luego navega a home
  }

}
