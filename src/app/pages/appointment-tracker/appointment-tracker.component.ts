import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';

@Component({
  selector: 'app-appointment-tracker',
  templateUrl: './appointment-tracker.component.html',
  styleUrls: ['./appointment-tracker.component.css']
})
export class AppointmentTrackerComponent implements OnInit {

  appointments: any[] = [];
  errorMessage: string | null = null;
  appointmentsData: Appointment [] = []

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.getAllAppointments2();
  }

  // getAllAppointments() {
  //   this.appointmentService.allAppointments().subscribe(
  //     (res) => {
  //       if (res && res.status === 'error') {
  //         this.appointments = [];
  //         this.errorMessage = 'Error retrieving appointments';
  //       } else if (res && res.status === 'success' && res.data && res.data.appointments) {
  //         this.appointments = res.data.appointments; // Adjust the data structure as necessary
  //         console.log(this.appointments);
  //         this.errorMessage = null;
  //       } else {
  //         // Handle unexpected response structure
  //         this.errorMessage = 'Unexpected response structure';
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       this.errorMessage = `Error: ${error.status} - ${error.message}`;
  //       console.error('There was an error!', error);
  //     }
  //   );
  // }

  getAllAppointments2() {
    this.appointmentService.allAppointments2().subscribe(
      (res) => {
        if (res && res.status === 'error') {
          this.appointments = [];
          this.errorMessage = 'Error retrieving appointments';
        } else if (res && res.status === 'success' && res.data && Array.isArray(res.data)) {
          this.appointmentsData = res.data; // Assuming 'appointmentsData' is the correct property for storing the data
          console.log(this.appointmentsData);
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
