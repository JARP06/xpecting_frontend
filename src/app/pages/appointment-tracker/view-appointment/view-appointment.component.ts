import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html',
  styleUrls: ['./view-appointment.component.css']
})
export class ViewAppointmentComponent implements OnInit {
  aId: any;
  appointmentsData: Appointment[] = []; // Initialize as empty array
  errorMessage: string | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private router: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.aId = params['aId'];
      this.oneAppointment();
    });
  }

  oneAppointment() {
    this.appointmentService.getOneAppointment(this.aId).subscribe(
      (res: any) => {
        if (res && res.status === 'error') {
          this.appointmentsData = []; // Assign an empty array instead of null
          this.errorMessage = 'Error retrieving appointment';
        } else if (res && res.status === 'success' && res.data) {
          if (Array.isArray(res.data)) {
            this.appointmentsData = res.data;
          } else {
            // Wrap the single appointment object in an array
            this.appointmentsData = [res.data];
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
