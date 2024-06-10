import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarersService } from 'src/app/services/carers.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {

  scheduled_time: string = ''; 
  loggedInUserId: string = ''; 
  allCarers: any;
  aId: any;
  appointment: any;

  constructor(
    private appointmentService: AppointmentService,
    private carerService: CarersService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.aId = params['aId'];
      this.getAllCarers();
      this.getAppointmentData();
      // Retrieve logged-in user's ID here and assign it to loggedInUserId
      this.getLoggedInUserId(); // Call the method to get logged-in user's ID
    });
  }

  getAllCarers() {
    this.carerService.getAllCarer().subscribe({
      next: (res) => {
        this.allCarers = res.data;
      },
      error: (error) => {

      }
    });
  }

  getAppointmentData() {
    this.appointmentService.getOneAppointment(this.aId).subscribe((res) => {
      if (res.status == 'error') {
      } else {
        this.appointment = res.data;
        // Convert the date to ISO string format
        this.scheduled_time = new Date(this.appointment.scheduled_time).toISOString().slice(0, 16);
      }
    });
  }

  getLoggedInUserId(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.loggedInUserId = user.id; // Assign user's ID to loggedInUserId
      },
      error: (err) => {
        console.error('Failed to get logged-in user ID', err);
        // Handle error appropriately
      }
    });
  }

  editAppointment(data: NgForm) {
    this.appointmentService.editAppointment(data.value, this.aId).subscribe((res) => {
      if (res.status === 'success') {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Changes applied to appointment successfully.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigateByUrl('/all-appointments');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to apply changes to appointment!',
        });
      }
    });
  }
}
