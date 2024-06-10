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
    this.setDefaultLogTime();
  }

  getLoggedInUserId(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.user_id = user.id;
      },
      error: (err) => {
        console.error('Failed to get logged-in user ID', err);
        
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

  setDefaultLogTime() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = this.padZero(currentDate.getMonth() + 1);
    const day = this.padZero(currentDate.getDate());
    const hours = this.padZero(currentDate.getHours());
    const minutes = this.padZero(currentDate.getMinutes());
    this.log_time = `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  logNewSymptom(symptomLogForm: NgForm) {
    if (symptomLogForm.valid) {
      const formValues = symptomLogForm.value;
      formValues.user_id = this.user_id; 
      this.symptomLogService.addToSymptomLog(formValues).subscribe((res) => {
        if (res.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Symptom logged successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigateByUrl('/all-logged-symptoms'); 
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
