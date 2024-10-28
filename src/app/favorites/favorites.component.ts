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

  //estrella deje de marcar yendo atras 
  cargarFavoritos() {
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

  //estrella deje de marcar yendo atras 
  esFavorito(icao: string): boolean {
    return this.favoritos.some(fav => fav.icao === icao);
  }

}


// cargarFavoritos(): Este método carga la lista de favoritos del localStorage y se llama en ngOnInit() y después de eliminar un favorito para asegurarse de que la vista se actualice.
// esFavorito(): Este método verifica si un ítem dado es un favorito, lo que ayuda a decidir si la estrella debe estar marcada o no.
// En tu HTML, usas ngIf para mostrar la estrella llena o vacía dependiendo de si el ítem es un favorito.