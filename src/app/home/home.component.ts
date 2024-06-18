import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Component } from '@angular/core'; // Import Component from Angular core
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-home', // Define the selector for this component
  templateUrl: './home.component.html', // Define the template URL
  styleUrls: ['./home.component.scss'] // Define the style URL
})
export class HomeComponent {
  welcomeMsg: string = "Welcome Dilan !..."; // Variable to store the name
  // Inject Router and HttpClient through the constructor
  constructor(private router: Router, private http: HttpClient) { }
}
