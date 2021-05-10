import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Game} from '../../interfaces/interfaces';
import Swal from 'sweetalert2';
import {InicioComponent} from '../inicio/inicio.component';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.cargarJuegos();
  }


  votarJuego(juego: Game): void {
    this.gameService.votarJuego(juego.id).subscribe(
      obj => {
        console.log(obj);
        Swal.fire({
          title: obj.goty.name,
          text: obj.mensaje,
          icon: 'success'
        });
      });

  }


  cargarJuegos(): void {
    this.gameService.getNominados().subscribe(
      obj => {
        this.juegos = obj;
      });
  }

}
