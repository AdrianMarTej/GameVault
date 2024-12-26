import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  template: `
    <div class="text-center">
      <h1 class="display-4">Welcome to GameVault</h1>
      <img src="assets/logo.png" alt="GameVault Logo" class="img-fluid my-4" style="max-width: 200px;">
      <p class="lead">Your personal Steam game library manager</p>
    </div>
  `,
})
export class MainComponent { }
