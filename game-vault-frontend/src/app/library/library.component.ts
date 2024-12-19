import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [NgFor],
  template: `
    <h2>My Library</h2>
    <ul class="list-group">
      <li class="list-group-item" *ngFor="let i of [1,2,3,4,5]">
        Game {{i}}
        <button class="btn btn-sm btn-danger float-end">Remove</button>
      </li>
    </ul>
  `,
})
export class LibraryComponent { }
