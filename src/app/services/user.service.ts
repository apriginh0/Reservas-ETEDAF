import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';


type UserRole = 'admin' | 'teacher';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrlPrincipal = environment.apiUrl;
  private apiUrl = `${this.apiUrlPrincipal}/users`;
  private validRoles: UserRole[] = ['admin', 'teacher'];



  constructor(private http: HttpClient) {}

  getPendingUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pending`, { withCredentials: true });
  }

  approveUser(userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve/${userId}`, {}, { withCredentials: true });
  }

  rejectUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/reject/${userId}`, { withCredentials: true });
  }

  getApprovedUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/approved`, { withCredentials: true });
  }
  changeUserRole(userId: string, role: string): Observable<any> {
    // Validar role antes de enviar
    if (!this.validRoles.includes(role.toLowerCase() as UserRole)) {
      return throwError(() => new Error(`Função inválida`));
    }
    return this.http.put(`${this.apiUrl}/change-role/${userId}`, { role }, { withCredentials: true });
  }
}

