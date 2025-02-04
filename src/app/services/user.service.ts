import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlPrincipal = environment.apiUrl;
  private apiUrl = `${this.apiUrlPrincipal}/users`;

  constructor(private http: HttpClient) {}

  getPendingUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending`);
  }

  approveUser(userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve/${userId}`, {});
  }

  rejectUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reject/${userId}`);
  }

  getApprovedUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/approved`);
  }

  changeUserRole(userId: string, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-role/${userId}`, { role });
  }
}

