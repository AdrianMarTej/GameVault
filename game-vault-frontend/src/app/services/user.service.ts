import { Injectable, WritableSignal, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private apiUrl = API_URL;
    private loggedUserId: string = 'NA';

    constructor(private http: HttpClient) { }

    public getUserById(id: string): Observable<any> {
        const data = { };
        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        return this.http.get<any>(`${this.apiUrl}/users/${id}`);
    }

    public getAllUsers(): Observable<any> {
        const data = { };
        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        return this.http.get<any>(`${this.apiUrl}/users/`);
    }

    public register(usernameText: string, emailText: string, passwordText: string): Observable<any> {
        const data = { username: usernameText, email: emailText, password: passwordText };
        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        return this.http.post<any>(`${this.apiUrl}/auth/register`, data, { headers });
    }

    public login(emailText: string, passwordText: string): Observable<any> {
        const data = { email: emailText, password: passwordText };
        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        return this.http.post<any>(`${this.apiUrl}/auth/login`, data, { headers });
    }

    public addFavoriteGame(userIdText: string, gameId: number): Observable<any> {
        const data = { id: gameId };
        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        return this.http.post<any>(`${this.apiUrl}/users/${this.loggedUserId}/favorites`, data, { headers });
    }

    public setLoggedUserId(id: string) {
        this.loggedUserId = id;
        console.log(this.loggedUserId);        
    }

    public getLoggedUserId(): string {
        return this.loggedUserId;
    }

}