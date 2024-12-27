import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/home">GameVault</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav w-100 justify-content-between">
            <li class="nav-item">
              <a class="nav-link" routerLink="/catalog" routerLinkActive="active">Catalog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/library" routerLinkActive="active">Library</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" data-bs-dismiss="modal">{{ this.loggedUserId === 'NA' ? 'Login' : 'Logout' }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {
  loggedUserId: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.updateLoggedUserId();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateLoggedUserId();
      }
    });
  }
  
  private updateLoggedUserId(): void {
    this.loggedUserId = this.userService.getLoggedUserId();
  }

}
