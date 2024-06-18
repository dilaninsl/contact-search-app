import { HttpClient, HttpParams } from '@angular/common/http'; // Import HttpClient and HttpParams for making HTTP requests and setting parameters
import { Component } from '@angular/core'; // Import Component from Angular core
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-contactlist', // Define the selector for this component
  templateUrl: './contactlist.component.html', // Define the template URL
  styleUrls: ['./contactlist.component.scss'] // Define the style URL
})
export class ContactlistComponent {
  sFirstName: string = ""; // First name search criteria
  sLastName: string = ""; // Last name search criteria
  sOrganisation: string = ""; // Organisation search criteria
  contactSearchResults: any; // Array to hold search results

  // Inject Router and HttpClient through constructor
  constructor(private router: Router, private http: HttpClient) {
    this.contactSearchResults = []; // Initialize search results array
  }

  // On component initialization
  ngOnInit() {
    // Define search parameters to fetch all contacts initially
    let httpParams = new HttpParams({
      fromObject: {
        "firstName": '*', // Wildcard to match any first name
        "lastName": '*', // Wildcard to match any last name
        "organisationName": '*' // Wildcard to match any organisation
      }
    });

    // Send HTTP GET request to fetch all contacts
    this.http.get('http://localhost:8080/api/v1/searchContacts', { params: httpParams }).subscribe((resultsData: any) => {
      this.contactSearchResults = resultsData; // Store the search results
    });
  }

  // Method to search contacts based on user input
  searchContacts() {
    // Define search parameters based on user input
    let httpParams = new HttpParams({
      fromObject: {
        "firstName": this.sFirstName, // User-provided first name
        "lastName": this.sLastName, // User-provided last name
        "organisationName": this.sOrganisation // User-provided organisation
      }
    });

    // Send HTTP GET request to search contacts based on criteria
    this.http.get('http://localhost:8080/api/v1/searchContacts', { params: httpParams }).subscribe((resultsData: any) => {
      this.contactSearchResults = resultsData; // Store the search results
    });
  }

  // Method to navigate to the contact view page
  viewContact(id: number) {
    this.router.navigateByUrl('/contactview/' + id); // Navigate to the contact view page with the contact ID
  }
}
