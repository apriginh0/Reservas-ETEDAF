import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrlPrincipal = environment.apiUrl;
  private apiUrl = `${this.apiUrlPrincipal}/reservation`;

  constructor(private http: HttpClient) {}

  //Funcão para criar uma reserva
  createReservation(reservationData: any): Observable<any> {
    return this.http.post(this.apiUrl, reservationData);
  }
}
