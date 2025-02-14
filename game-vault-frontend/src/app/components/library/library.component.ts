import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Game } from '../../models/game';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <h2 class="text-center mb-4">My Library</h2>
      <ng-container *ngIf="favoriteGames$ | async as games; else loading">
        <div *ngIf="games.length > 0; else noGames" class="row row-cols-1 row-cols-md-3 g-4">
          <div class="col" *ngFor="let game of games">
            <div class="card h-100">
              <div class="card-body">
                <h5 class="card-title">{{ game.name }}</h5>
                <p class="card-text">{{ game.description }}</p>
                <p><strong>Genre:</strong> {{ game.genre }}</p>
                <p><strong>Age Rating:</strong> {{ game.age_rating }}</p>
                <p><strong>Developer:</strong> {{ game.developer }}</p>
                <button class="btn btn-danger mt-2" (click)="deleteGame(game.id)">Remove from your Library</button>
              </div>
            </div>
          </div>
        </div>
        <ng-template #noGames>
          <h5 class="text-center mb-4">Logged in as: {{ this.loggedUserUsername }}</h5>
          <p class="text-center">You haven't added any games to your library yet.</p>
        </ng-template>
      </ng-container>
      <ng-template #loading>
        <div class="text-center">
          <p><strong>Please log in to view your library.</strong></p>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: scale(1.05);
    }
  `]
})
export class LibraryComponent implements OnInit {
  loggedUserUsername: string = '';
  private refreshTrigger = new BehaviorSubject<void>(undefined);
  favoriteGames$: Observable<Game[]>;

  constructor(private userService: UserService) {
    this.favoriteGames$ = new Observable<Game[]>();
  }

  ngOnInit() {
    this.favoriteGames$ = this.refreshTrigger.pipe(
      switchMap(() => this.userService.getLoggedUserId()),
      switchMap(userId => {
        if (userId === 'NA') {
          return [];
        } else {
          return this.userService.getFavorites(userId);
        }
      }),
      
      catchError(error => {
        console.error('Error fetching library games:', error);
        return [];
      })
    );
    this.userService.getLoggedUserUsername().subscribe({
      next: (username: string) => {
        this.loggedUserUsername = username;
      },
      error: (error: any) => {
        console.error('Error fetching logged user username:', error);
      }
    });
  }

  deleteGame(gameId: number) {
    this.userService.getLoggedUserId().pipe(
      switchMap(userId => {
        if (userId === 'NA') {
          throw new Error('No user logged in');
        }
        return this.userService.deleteFavoriteGame(userId, gameId);
      }),
      tap(() => {
        console.log('Game deleted successfully');
        this.refreshTrigger.next();
      }),
      catchError(error => {
        console.error('Error deleting game:', error);
        return [];
      })
    ).subscribe();
  }
}

