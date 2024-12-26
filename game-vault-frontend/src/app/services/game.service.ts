import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  public getGameByAppId(appId: number): Observable<any> {
    const data = { };
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.get<any>(`${this.apiUrl}/users/${appId}`);
  }

  public getAllGames(): Observable<any> {
    const data = { };
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.get<any>(`${this.apiUrl}/games/`);
  }

  public createGame(idText: number, nameText: string, descriptionText: string, genreText: string, age_ratingText: number, developerText: string): Observable<any> {
    const data = { id: idText, name : nameText, description: descriptionText, genre: genreText, age_rating: age_ratingText, developer: developerText };
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.post<any>(`${this.apiUrl}/games/`, data, { headers });
  }

  public deleteGameByAppId(idText: number): Observable<number> {
    const data = { };
    const headers = new HttpHeaders({ 'content-type': 'application/json' });

    return this.http.delete<any>(`${this.apiUrl}/games/${idText}`);
  }

}

