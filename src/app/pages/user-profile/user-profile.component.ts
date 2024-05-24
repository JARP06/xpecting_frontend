import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { SymptomLogService } from 'src/app/services/symptom-log.service';
import { SymptomLog } from 'src/app/models/symptom-log';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/models/users';
import { HttpErrorResponse } from '@angular/common/http'; // Import HttpErrorResponse for error handling

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  symptomLogs: SymptomLog[] = []; // Change lastSymptomLog to symptomLogs for displaying multiple logs
  errorMessage: string | null = null;
  user: Users | null = null;

  constructor(
    private symptomLogService: SymptomLogService,
    private authService: AuthService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        console.log('User profile retrieved:', res);
        this.user = res.data.user;
        this.allSymptomsLogged(); // Call method to get symptom logs
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error retrieving user profile: ${error.message}`;
        console.error('Error retrieving user profile:', error);
      }
    });
  }

  allSymptomsLogged(): void {
    this.symptomLogService.allSymptomsLogged().subscribe(
      (res) => {
        if (res && res.status === 'error') {
          this.symptomLogs = []; // Change symptomsData to symptomLogs
          this.errorMessage = 'Error retrieving symptom logs';
        } else if (res && res.status === 'success' && res.data && Array.isArray(res.data)) {
          this.symptomLogs = res.data.slice(0, 3); // Change symptomsData to symptomLogs
          console.log(this.symptomLogs);
          this.errorMessage = null;
        } else {
          this.errorMessage = 'Unexpected response structure';
        }
      },
      (error: HttpErrorResponse) => { // Adjust error type
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
        console.error('There was an error!', error);
      }
    );
  }

  resetPassword(): void {
    if (this.user && this.user.id) {
      this.authService.resetPassword(this.user.id).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            console.log(res.message);
            // Perform success action, e.g., show a success message
          } else {
            console.error('Error resetting password:', res.message);
            // Handle unexpected response structure
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error resetting password:', error);
          // Handle error, e.g., show an error message
        }
      });
    } else {
      console.error('User data is missing or incomplete');
      // Handle case where user data is not available
    }
  }
}
