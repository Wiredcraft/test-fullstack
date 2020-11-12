import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  user;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(data => {
      this.user = data;
    });
  }

  logout() {
    this.authService.logout();
  }
}
