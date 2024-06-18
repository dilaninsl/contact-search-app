import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests
import { Component, Input, inject } from '@angular/core'; // Import Component and inject from Angular core
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute and Router for routing


@Component({
  selector: 'app-contactedit', // Define the selector for this component
  templateUrl: './contactedit.component.html', // Define the template URL
  styleUrls: ['./contactedit.component.scss'] // Define the style URL
})
export class ContacteditComponent {
  editContactId: number = 0; // ID of the contact being edited
  eFirstName: string = ""; // First name of the contact
  eLastName: string = ""; // Last name of the contact
  eOrganisation: string = ""; // Organisation name of the contact
  eOrganisationObj: any; // Organisation object of the contact
  eOrganisationsList: any; // List of all organisations
  vOrganisationId:number = 0; // ID of the organisation
  eSelectedOrgId:number=0; // ID of the selected organisation

  // Inject Router and HttpClient through constructor
  constructor(private router: Router, private http: HttpClient){}
  // Inject ActivatedRoute to get the current route parameters
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  // On component initialization
  ngOnInit(){
    // Get the contact ID from the route parameters
    this.editContactId = this.activeRoute.snapshot.params['id'];
    // Fetch the list of organisations
    this.http.get('http://localhost:8080/api/v1/organisations').subscribe((resultsOrgsList: any)=>{
      this.eOrganisationsList = resultsOrgsList; // Store the organisations list
      // Fetch the contact details by ID
      this.http.get('http://localhost:8080/api/v1/contacts/'+ this.editContactId).subscribe((resultsData: any)=>{
        this.eFirstName = resultsData['firstName']; // Store the first name
        this.eLastName = resultsData['lastName']; // Store the last name
        this.eOrganisation = resultsData['organisationName']; // Store the organisation name
        this.eOrganisationObj = resultsData['organisation']; // Store the organisation object
        this.vOrganisationId = this.eOrganisationObj.id; // Store the organisation ID
        this.eSelectedOrgId = this.eOrganisationObj.id; // Store the selected organisation ID
      });
    });

    
  }
  // Handle the change of the selected organisation in the dropdown
  getSelectedOrgId(event: any){
    this.eSelectedOrgId = event.target.value; // Update the selected organisation ID
  }
  // Save the updated contact details
  saveContact(id: number){
    // Prepare the request body data
    let bodyData = {
      firstName: this.eFirstName,
      lastName: this.eLastName,
      organisationId: this.eSelectedOrgId 
    };
    // Send the PUT request to update the contact
    this.http.put('http://localhost:8080/api/v1/updateContact/'+ id, bodyData).subscribe((resultsData: any)=>{
      // Check if the response contains the updated contact ID
      if(resultsData.hasOwnProperty('id')){
        alert("Contact has been updated Successfully !..."); // Alert the user of success
        this.router.navigateByUrl('/contactview/' + resultsData.id); // Navigate to the contact view page
      }
      else{
        alert("Error with Contact update !..."); // Alert the user of error
      }
    });
  }
  // Cancel the edit and navigate back to the contact view page
  cancelEdit(id: number){
    this.router.navigateByUrl('/contactview/' + id); // Navigate to the contact view page
  }
}
