import { Component, OnInit } from '@angular/core';
import {Game} from '../../interfaces/interfaces';
import {GameService} from '../../services/game.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: { name: string; value: number }[] = [];


  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    // Realiza actualizacion con endpoint cada 3 seg
    this.obtenerJuegos();
    setInterval(() => {
      this.obtenerJuegos();
    }, 3000);
  }


  obtenerJuegos(): void {
    this.gameService.getNominados()
      .pipe(
        map((resp: Game[]) => {
          return resp.map(({name, votos}) => ({name, value: votos}));
        })
      )
      .subscribe(
        obj => {
          this.juegos = obj;
          console.log(obj);
        });
  }

}
