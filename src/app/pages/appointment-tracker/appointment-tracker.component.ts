import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointment-tracker',
  templateUrl: './appointment-tracker.component.html',
  styleUrls: ['./appointment-tracker.component.css']
})
export class AppointmentTrackerComponent implements OnInit {

  appointmentsData: Appointment[] = [];
  errorMessage: string | null = null;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.allAppointments().subscribe({
      next: (res) => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          this.appointmentsData = res.data;
          this.errorMessage = null;
        } else {
          this.appointmentsData = [];
          this.errorMessage = 'Error retrieving appointments';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
        console.error('There was an error!', error);
      }
    });
  }

  confirmDelete(appointmentId: number): void {
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
        this.deleteAppointment(appointmentId);
      }
    });
  }

  deleteAppointment(appointmentId: number): void {
    this.appointmentService.deleteAppointment(appointmentId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Appointment deleted successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.getAllAppointments();
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to delete appointment!'
          });
        }
      },
      error: (err) => {
        console.error('Failed to delete appointment', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      }
    });
  }
}
