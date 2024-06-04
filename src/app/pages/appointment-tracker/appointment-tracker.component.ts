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
  loginErr: boolean = false;
  userData: any;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch appointments when the component initializes
    this.getAllAppointments();
  }

  getAllAppointments() {
    this.appointmentService.allAppointments2().subscribe({
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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to delete appointment?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Call the delete function if the user confirms deletion
          this.deleteAppointment(appointmentId);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelled',
            text: 'Your appointment is safe :)',
            icon: 'error',
          });
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
            // Refresh the list after deletion
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
