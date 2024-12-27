import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2 class="text-center mb-4">Game Catalog</h2>
    <h5>your id: {{ this.loggedUserId }}</h5> <!-- Debugging purposes -->
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Search for a game..." [(ngModel)]="searchQuery" (ngModelChange)="searchGames()">
    </div>
    <div class="row row-cols-1 row-cols-md-5 g-4">
      <div class="col" *ngFor="let game of games()">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title" style="text-align: center;">{{ game.name }}</h5>
            <p class="card-text">{{ game.description }}</p>
            <p><strong>Genre:</strong> {{ game.genre }}</p>
            <p><strong>Age Rating:</strong> {{ game.age_rating }}</p>
            <p><strong>Developer:</strong> {{ game.developer }}</p>
            <button class="btn btn-primary" (click)="this.addFavoriteGame(game.id) ">Add to Favorites</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CatalogComponent implements OnInit {
  games: WritableSignal<Game[]> = signal<Game[]>([]);
  searchQuery: string = '';
  loggedUserId: string = '';

  constructor(private gameService: GameService, private userService: UserService) {}

  ngOnInit() {
    this.getAllGames();
    this.userService.getLoggedUserId().subscribe({
      next: (id: string) => {
        this.loggedUserId = id;
      },
      error: (error: any) => {
        console.error('Error fetching logged user ID:', error);
      }
    });
  }

  getAllGames() {
    this.gameService.getAllGames().subscribe({
      next: (data: Game[]) => {
        console.log(data);
        this.games.set(data);
      },
      error: (error: any) => {
        console.error('Error fetching games:', error);
      }
    });
  }

  searchGames() {
    if (this.searchQuery.trim() !== '') {
      const filteredGames = this.games().filter(game => 
        game.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.games.set(filteredGames);
    } else {
      this.getAllGames();
    }
  }

  addFavoriteGame(gameId: number) {
    if (this.loggedUserId == 'NA') {
      console.error('User not logged in');
      alert('Please log in to add games to favorites');
      return;
    }
    this.userService.addFavoriteGame(this.loggedUserId, gameId).subscribe({
      next: (data: any) => {
        console.log('Game added to favorites:', data);
        alert('Game added to favorites');
      },
      error: (error: any) => {
        console.error('Error adding game to favorites:', error);
        alert('Error adding game to favorites');
      }
    });
  }
}

