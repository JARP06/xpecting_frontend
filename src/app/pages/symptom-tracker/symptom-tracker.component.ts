import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SymptomLogService } from 'src/app/services/symptom-log.service';
import { AuthService } from 'src/app/services/auth.service';
import { SymptomLog } from 'src/app/models/symptom-log';

@Component({
  selector: 'app-symptom-tracker',
  templateUrl: './symptom-tracker.component.html',
  styleUrls: ['./symptom-tracker.component.css']
})
export class SymptomTrackerComponent implements OnInit {

  symptomsData: SymptomLog[] = [];
  errorMessage: string | null = null;
  loginErr: boolean = false;
  userData: any;

  constructor(
    private symptomLogService: SymptomLogService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        this.loginErr = false;
        console.log('PROFILE RESPONSE --- ', res.data.user);
        this.userData = res.data.user;
        this.loadAllSymptomsLogged();
      },
      error: (error) => {
        console.log(error);
        if (error.error) {
          this.loginErr = true;
          setTimeout(() => {
            this.router.navigateByUrl('/login-signup');
            this.loginErr = false;
          }, 5000);
        }
      }
    });
  }

  loadAllSymptomsLogged() {
    this.symptomLogService.allSymptomsLogged().subscribe({
      next: (res) => {
        if (res && res.status === 'error') {
          this.symptomsData = [];
          this.errorMessage = 'Error retrieving symptoms';
        } else if (res && res.status === 'success' && Array.isArray(res.data)) {
          this.symptomsData = res.data;
          console.log(this.symptomsData);
          this.errorMessage = null;
          this.filterUserSymptoms();
        } else {
          // Handle unexpected response structure
          this.errorMessage = 'Unexpected response structure';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
        console.error('There was an error!', error);
      }
    });
  }

  filterUserSymptoms() {
    if (this.symptomsData) {
      this.symptomsData = this.symptomsData.filter(symptom => 
        symptom.user_id === this.userData.id
      );
    }
  }
}
