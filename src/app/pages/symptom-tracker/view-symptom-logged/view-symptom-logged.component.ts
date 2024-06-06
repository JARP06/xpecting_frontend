import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomLog } from 'src/app/models/symptom-log';
import { SymptomLogService } from 'src/app/services/symptom-log.service';



@Component({
  selector: 'app-view-symptom-logged',
  templateUrl: './view-symptom-logged.component.html',
  styleUrls: ['./view-symptom-logged.component.css']
})
export class ViewSymptomLoggedComponent implements OnInit {
  slId: any;
  symptomsData: SymptomLog[] = []; // Initialize as empty array
  errorMessage: string | null = null;

  constructor(
    private symptomLogServices: SymptomLogService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.slId = params['slId'];
      this.oneSymptom();
    });
  }

  oneSymptom() {
    this.symptomLogServices.getOneSymptomLogged(this.slId).subscribe(
      (res: any) => {
        if (res && res.status === 'error') {
          this.symptomsData = []; // Assign an empty array instead of null
          this.errorMessage = 'Error retrieving appointment';
        } else if (res && res.status === 'success' && res.data) {
          if (Array.isArray(res.data)) {
            this.symptomsData = res.data;
          } else {
            // Wrap the single appointment object in an array
            this.symptomsData = [res.data];
          }
          this.errorMessage = null;
        } else {
          // Handle unexpected response structure
          this.errorMessage = 'Unexpected response structure';
          console.error('Unexpected response structure:', res);
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
        console.error('There was an error!', error);
      }
    );
  } 
  
}
