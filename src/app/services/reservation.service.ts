import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrlPrincipal = environment.apiUrl;
  private apiUrl = `${this.apiUrlPrincipal}/reservation`;

  constructor(private http: HttpClient) {}

  //Funcão para criar uma reserva
  createReservation(reservationData: any): Observable<any> {
    if (!reservationData.date || !reservationData.classId) {
      return throwError(() => new Error('Dados incompletos'));
    }
    return this.http.post(this.apiUrl, reservationData, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Erro na reserva:', error);
        return throwError(() => new Error('Por favor, preencha todos os campos obrigatórios'));
      })
    );
  }
}
