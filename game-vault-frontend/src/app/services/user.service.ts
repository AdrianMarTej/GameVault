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
    private loggedUserUsername: string = 'NA';

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

    public addFavoriteGame(userIdText: string, gameIdText: number): Observable<any> {
        const data = { id: gameIdText };
        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        return this.http.post<any>(`${this.apiUrl}/users/${this.loggedUserId}/favorites`, data, { headers });
    }

    public deleteFavoriteGame(userIdText: string, gameIdText: number): Observable<any> {
        const data = { id: gameIdText };
        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        return this.http.delete<any>(`${this.apiUrl}/users/${this.loggedUserId}/favorites`, { headers, body: data });
    }

    public getFavorites(userIdText: string): Observable<any> {
        const data = { };
        const headers = new HttpHeaders({ 'content-type': 'application/json' });

        return this.http.get<any>(`${this.apiUrl}/users/${this.loggedUserId}/favorites`);
    }

    public setLoggedUserId(id: string) {
        this.loggedUserId = id;
        console.log(this.loggedUserId);        
    }

    public getLoggedUserId(): Observable<string> {
        return new Observable<string>((observer) => {
            observer.next(this.loggedUserId);
            observer.complete();
        });
    }

    public setLoggedUserUsername(username: string) {
        this.loggedUserUsername = username;
        console.log(this.loggedUserUsername);
    }

    public getLoggedUserUsername(): Observable<string> {
        return new Observable<string>((observer) => {
            observer.next(this.loggedUserUsername);
            observer.complete();
        });
    }

}