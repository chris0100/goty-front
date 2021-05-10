import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';
import {Game} from '../interfaces/interfaces';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  juegos: Game[] = [];


  constructor(private http: HttpClient, private router: Router) { }


  // Obtener los juegos nominados
  getNominados(): Observable<Game[]> {

/*    if (this.juegos.length > 0){
      console.log('desde cache');
      return of(JSON.parse(localStorage.getItem('juegos')));

    } else {*/
      return this.http.get<Game[]>(`${environment.url}/goty`)
        .pipe(
          tap(
            // guardar los juegos del observable en memoria
            obj => this.juegos = obj
          ),
          catchError(err => {
            if (err.status === 0){
              Swal.fire({
                title: 'Error',
                text: 'No hay respuesta por parte del servidor',
                icon: 'error',
                showConfirmButton: true
              });
              this.router.navigate(['/inicio']);
              return throwError(err);
            }
            else {
              Swal.fire({
                title: 'Error',
                text: err.error.errors[0],
                icon: 'error',
                showConfirmButton: true
              });
              return throwError(err);
            }
          }));
  }



  // Realizar el voto
  votarJuego(id: number): any{
    return this.http.post(`${environment.url}/goty/${id}`, {})
      .pipe(
        catchError(err => {
          if (err.status === 404){
            Swal.fire({
              title: 'Error',
              text: err.error.mensaje,
              icon: 'error',
              showConfirmButton: true
            });
            return throwError(err);
          }
        }));
  }



}
