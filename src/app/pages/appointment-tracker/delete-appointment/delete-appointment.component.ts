import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-appointment',
  templateUrl: './delete-appointment.component.html',
  styleUrls: ['./delete-appointment.component.css']
})
export class DeleteAppointmentComponent implements OnInit {
  aId: number | undefined;

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.aId = +params['id'];  // Corrected variable name
    if (this.aId) {
      this.confirmDeleteAppointment(this.aId);
    }
  });
}

  confirmDeleteAppointment(aId: number): void {
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
        this.deleteAppointment(aId);
      } else {
        this.router.navigateByUrl('/appointments');
      }
    });
  }

  deleteAppointment(aId: number): void {
    this.appointmentService.deleteAppointment(aId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Appointment deleted successfully',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigateByUrl('/appointments');
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
