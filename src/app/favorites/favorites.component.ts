import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }

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

}
