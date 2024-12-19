import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [NgFor],
  template: `
    <h2>Game Catalog</h2>
    <div class="mb-3">
      <input type="text" class="form-control" placeholder="Search for a game...">
    </div>
    <div class="row row-cols-1 row-cols-md-5 g-4">
      <div class="col" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]">
        <div class="card h-100">
          <img src="https://via.placeholder.com/150" class="card-img-top" alt="Game Image">
          <div class="card-body">
            <h5 class="card-title">Game {{i}}</h5>
            <p class="card-text">Short description of the game.</p>
            <button class="btn btn-primary">Add to Library</button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class CatalogComponent { }
