import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SymptomLogService } from 'src/app/services/symptom-log.service';
import { AuthService } from 'src/app/services/auth.service';
import { SymptomLog } from 'src/app/models/symptom-log';
import Swal from 'sweetalert2';

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

  confirmDeleteSymptomLogged(symptomLogId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Confirm Deletion',
          text: 'Are you really sure you want to delete this symptom log?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.deleteSymptomLogged(symptomLogId);
          }
        });
      }
    });
  }
  deleteSymptomLogged(symptomLogId: number): void {
    this.symptomLogService.deleteSymptomLog(symptomLogId).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Symptom logged deleted successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigateByUrl('/all-logged-symptoms');
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete logged symptom!'
        });
      }
    });
  }
}
