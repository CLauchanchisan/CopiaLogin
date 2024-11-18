import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AuthService } from '../auth.service';

interface Favorito {
  name: string;
  icao: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  favoritos: Favorito[] = [];
  //icao: string = '';

  constructor(private router: Router, private dataService: DataService, private auth: AuthService) {}

  //e carga la lista de favoritos desde localStorage. Si no hay favoritos, se carga un arreglo vacío [].
  ngOnInit() {
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.verificarUsuario();
  }

  /**
   * @function cargarFavoritos
   * @description Este método carga la lista de favoritos del localStorage y se llama en ngOnInit() y después de eliminar un favorito para asegurarse de que la vista se actualice.
   */
  cargarFavoritos() {
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  }


   /**
   * @function goHome
   * @description Navega a la página de inicio cuando se invoca este método.
   */
  goHome() {
    this.router.navigate(['/home']);
  }

  /**
   * @function eliminarFavorito
   * @description para eliminar el favorito de la lista
   *  Este método elimina un favorito de la lista al filtrar el arreglo de favoritos por el icao del favorito que se desea eliminar. Luego, actualiza localStorage para persistir la nueva lista de favoritos.
   * @param favoritoItem
   */
  eliminarFavorito(favorito: Favorito) {
    this.favoritos = this.favoritos.filter((fav) => fav.icao !== favorito.icao);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }

  /**
   * @function verFavorito
   * @description Vuelve a mostrar la informacion de los favoritos guardados
   * Este método se llama cuando un usuario quiere ver los detalles de un favorito. Cambia el ICAO a través del servicio dataService y luego redirige a la página de inicio.
   */
  verFavorito(icao: string) {
    this.dataService.changeIcao(icao); // Cambia el ICAO en el servicio
    this.router.navigate(['/home']); // Luego navega a home
  }

  /**
   * @function esFavorito
   * @description Este método verifica si un ítem dado es un favorito, lo que ayuda a decidir si la estrella debe estar marcada o no.
   * verifica si un elemento con un icao específico está en la lista de favoritos. Devuelve true si el aeropuerto es un favorito y false si no lo es.
   */
  esFavorito(icao: string): boolean {
    return this.favoritos.some((fav) => fav.icao === icao);
  }

   /**
   * @function verificarUsuario
   * @description Verifica que el usuario esté logueado
   * Este método verifica si el usuario está autenticado mediante el servicio AuthService. Si no está autenticado, redirige a la página de login.
   */

  verificarUsuario() {
    this.auth.getUser().subscribe((res) => {
      if (!res) {
        this.router.navigate(['/login']);
      }
    });
  }
}