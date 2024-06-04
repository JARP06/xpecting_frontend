import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomLogService } from 'src/app/services/symptom-log.service';
import { SymptomsService } from 'src/app/services/symptoms.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-symptom',
  templateUrl: './log-symptom.component.html',
  styleUrls: ['./log-symptom.component.css']
})
export class LogSymptomComponent implements OnInit {
  user_id: string = '';
  symptom_id: string = '';
  log_time: string = '';
  note: string = '';
  severity: number = 1;

  allSymptom: any;

  constructor(
    private symptomLogService: SymptomLogService,
    private symptomsService: SymptomsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoggedInUserId();
    this.getAllSymptom();
  }

  getLoggedInUserId(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user_id = user.id;
      },
      error: (err) => {
        console.error('Failed to get logged-in user ID', err);
        // Handle error appropriately
      }
    });
  }

  getAllSymptom() {
    this.symptomsService.getAllSymptoms().subscribe({
      next: (res) => {
        this.allSymptom = res.data;
      },
      error: (error) => {
        console.error('Error fetching symptoms', error);
      }
    });
  }

  logNewSymptom(symptomLogForm: NgForm) {
    if (symptomLogForm.valid) {
      const formValues = symptomLogForm.value;
      formValues.user_id = this.user_id; // Ensure user_id is correctly set
      this.symptomLogService.addToSymptomLog(formValues).subscribe((res) => {
        if (res.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Symptom logged successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigateByUrl('/symptom-logs');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to log symptom!'
          });
        }
      });
    }
  }
}
