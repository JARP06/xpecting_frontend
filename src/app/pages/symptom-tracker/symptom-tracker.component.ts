import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SymptomLog } from 'src/app/models/symptom-log';
import { SymptomLogService } from 'src/app/services/symptom-log.service';

@Component({
  selector: 'app-symptom-tracker',
  templateUrl: './symptom-tracker.component.html',
  styleUrls: ['./symptom-tracker.component.css']
})
export class SymptomTrackerComponent implements OnInit {
  symptoms: any[] = [];
  errorMessage: string | null = null;
  symptomsData: SymptomLog [] = []

  constructor(private symptomLogService: SymptomLogService) {}

  ngOnInit(): void {
    this.allSymptomsLogged();
  }


  allSymptomsLogged() {
    this.symptomLogService.allSymptomsLogged().subscribe(
      (res) => {
        if (res && res.status === 'error') {
          this.symptoms = [];
          this.errorMessage = 'Error retrieving symptoms';
        } else if (res && res.status === 'success' && res.data && Array.isArray(res.data)) {
          this.symptomsData = res.data; // Assuming 'symptomsData' is the correct property for storing the data
          console.log(this.symptomsData);
          this.errorMessage = null;
        } else {
          // Handle unexpected response structure
          this.errorMessage = 'Unexpected response structure';
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
        console.error('There was an error!', error);
      }
    );
  }
}
