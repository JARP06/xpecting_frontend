import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { CarersService } from 'src/app/services/carers.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  user_id: string = '';
  carer_id: string = '';
  scheduled_time: string = '';
  note: string = '';
  allCarers: any;

  constructor(
    private appointmentService: AppointmentService,
    private carerService: CarersService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLoggedInUserId();
    this.getAllCarers();
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

  getAllCarers() {
    this.carerService.getAllCarer().subscribe({
      next: (res) => {
        this.allCarers = res.data;
      },
      error: (error) => {
        console.error('Error fetching carers', error);
      }
    });
  }

  addNewAppointment(appointmentForm: NgForm) {
    if (appointmentForm.valid) {
      const formValues = appointmentForm.value;
      formValues.user_id = this.user_id; // Ensure user_id is correctly set
      this.appointmentService.addAppointment(formValues).subscribe((res) => {
        if (res.status === 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Appointment added Successfully',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.router.navigateByUrl('/all-appointments'); // Redirect to '/all-appointments'
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to add appointment!'
          });
        }
      });
    }
  }
}
