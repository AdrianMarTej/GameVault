import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../app.config';

export interface Game {
  id: number;
  name: string;
  description: string;
  genre: string;
  age_rating: number;
  developer: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  getGameByAppId(appId: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games/${appId}`);
  }

  getGameByName(name: string): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/games`, { params: { name } });
  }

  searchGames(query: string): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/games/search`, { params: { query } });
  }
}

