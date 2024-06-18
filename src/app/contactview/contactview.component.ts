import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Component, Input, inject } from '@angular/core'; // Import Component, Input, and inject from Angular core
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router for route handling and navigation

@Component({
  selector: 'app-contactview', // Define the selector for this component
  templateUrl: './contactview.component.html', // Define the template URL
  styleUrls: ['./contactview.component.scss'] // Define the style URL
})
export class ContactviewComponent {
  contactId: number = 0; // Variable to store the contact ID
  vFirstName: string = ""; // Variable to store the contact's first name
  vLastName: string = ""; // Variable to store the contact's last name
  vOrganisation: string = ""; // Variable to store the organisation name
  vABN: string = ""; // Variable to store the organisation's ABN
  vCreated: string = ""; // Variable to store the date the contact was created
  vOrganisationObj: any; // Variable to store the organisation object

  // Inject Router and HttpClient through constructor
  constructor(private router: Router, private http: HttpClient) {   
  }

  // Inject ActivatedRoute to access route parameters
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  // On component initialization
  ngOnInit() {
    // Get the contact ID from route parameters
    this.contactId = this.activeRoute.snapshot.params['id'];
    
    // Send HTTP GET request to fetch contact details by ID
    this.http.get('http://localhost:8080/api/v1/contacts/' + this.contactId).subscribe((resultsData: any) => {
      // Populate component variables with data from the response
      this.vFirstName = resultsData['firstName'];
      this.vLastName = resultsData['lastName'];
      this.vOrganisation = resultsData['organisationName'];
      this.vOrganisationObj = resultsData['organisation'];
      this.vABN = this.vOrganisationObj['abn'];
      this.vCreated = resultsData['dateCreated'];
    });
  }

  // Method to navigate to the contact edit page
  editContact(id: number) {
    this.router.navigateByUrl('/contactedit/' + id); // Navigate to the contact edit page with the contact ID
  }
}
