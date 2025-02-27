import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Busca todas as salas
  getSalas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/salas`, { withCredentials: true});
  }

  // Cria uma reserva de sala
  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/class_reservations`, reservationData, { withCredentials: true });
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.apiUrl}/class_reservations`, { withCredentials: true});
  }

  getReservationsByDate(date: string, classId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/class_reservations?date=${date}&classId=${classId}`, { withCredentials: true});
  }

  updateReservation(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/class_reservations/${id}`, data, { withCredentials: true });
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/class_reservations/${id}`, { withCredentials: true});
  }
}

