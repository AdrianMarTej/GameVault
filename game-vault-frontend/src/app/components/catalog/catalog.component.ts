import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService, Game } from '../../services/game.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Game Catalog</h2>
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Search for a game..." [(ngModel)]="searchQuery" (ngModelChange)="searchGames()">
    </div>
    <div class="row row-cols-1 row-cols-md-5 g-4">
      <div class="col" *ngFor="let game of games">
        <div class="card h-100">
          <img src="https://via.placeholder.com/150" class="card-img-top" alt="{{ game.name }}">
          <div class="card-body">
            <h5 class="card-title">{{ game.name }}</h5>
            <p class="card-text">{{ game.description }}</p>
            <button class="btn btn-primary" (click)="addToLibrary(game)">Add to Library</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CatalogComponent implements OnInit {
  games: Game[] = [];
  searchQuery: string = '';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.searchGames();
  }

  searchGames() {
    if (this.searchQuery.trim() !== '') {
      this.gameService.searchGames(this.searchQuery).subscribe(
        (games) => {
          this.games = games;
        },
        (error) => {
          console.error('Error searching games:', error);
        }
      );
    } else {
      // Load some default games or clear the list
      this.games = [];
    }
  }

  addToLibrary(game: Game) {
    // TODO: Implement add to library functionality
    console.log('Adding game to library:', game);
  }
}

