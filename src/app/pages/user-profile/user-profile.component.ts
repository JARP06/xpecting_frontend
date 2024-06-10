import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SymptomLogService } from 'src/app/services/symptom-log.service';
import { SymptomLog } from 'src/app/models/symptom-log';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/models/users';
import { HttpErrorResponse } from '@angular/common/http';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';
import { NgForm } from '@angular/forms'; // Import NgForm
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  symptomLogs: SymptomLog[] = [];
  appointments: Appointment[] = [];
  errorMessage: string | null = null;
  user: Users | null = null;
  upcomingAppointments: Appointment[] = [];
  recentSymptomLogs: SymptomLog[] = [];
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private symptomLogService: SymptomLogService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (res) => {
        console.log('User profile retrieved:', res);
        this.user = res.data.user;
        this.loadUserData();
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = `Error retrieving user profile: ${error.message}`;
        console.error('Error retrieving user profile:', error);
      }
    });
  }

  loadUserData(): void {
    this.loadSymptomLogs();
    this.loadAppointments();
  }

  loadSymptomLogs(): void {
    this.symptomLogService.allSymptomsLogged().subscribe(
      (res) => {
        if (res && res.status === 'success' && res.data && Array.isArray(res.data)) {
          this.symptomLogs = res.data.filter(symptom => symptom.user_id === this.user?.id);
          this.recentSymptomLogs = this.symptomLogs.slice(-3); 
          console.log('Symptom logs:', this.symptomLogs);
          this.errorMessage = null;
        } else {
          this.errorMessage = 'Error retrieving symptom logs';
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
        console.error('Error retrieving symptom logs:', error);
      }
    );
  }

  loadAppointments(): void {
    this.appointmentService.allAppointments2().subscribe(
      (res) => {
        if (res.status === 'success' && Array.isArray(res.data)) {
          this.appointments = res.data.filter(appointment => appointment.user_id === this.user?.id);
          console.log('All Appointments:', this.appointments); 
          const now = new Date();
          const futureAppointments = this.appointments
            .filter(appointment => new Date(appointment.scheduled_time) >= now)
            .sort((a, b) => new Date(a.scheduled_time).getTime() - new Date(b.scheduled_time).getTime());
          console.log('Future Appointments:', futureAppointments); // Log future appointments
          console.log('Total Future Appointments:', futureAppointments.length); // Log total future appointments
          // Take the next 3 upcoming appointments
          this.upcomingAppointments = futureAppointments.slice(0, 3);
          console.log('Upcoming Appointments:', this.upcomingAppointments); // Log upcoming appointments
          this.errorMessage = null;
        } else {
          this.errorMessage = 'Error retrieving appointments';
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = `Error: ${error.status} - ${error.message}`;
        console.error('Error retrieving appointments:', error);
      }
    );
  }

  getUserAge(dateOfBirth: string | Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  getWeeksRemaining(dueDate: string | Date): number {
    const now = new Date();
    const due = new Date(dueDate);
    const diffInMs = due.getTime() - now.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24 * 7));
  }

  isAgeRedBorder(): boolean {
    const age = this.user ? this.getUserAge(this.user.date_of_birth) : 0;
    return age <= 17 || age >= 35;
  }

  resetPassword(id: number, currentPassword: string, newPassword: string, confirmNewPassword: string): void {
    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'New password and confirm new password do not match',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    this.authService.resetPassword(id, currentPassword, newPassword, confirmNewPassword).subscribe({
        next: (res) => {
            console.log(res);
            if (res.status === 'success') {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${res.message}, login with new password`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setTimeout(() => {
                    this.authService.logout();
                    window.location.reload();
                }, 1500);
            }
        },
        error: (error) => {
            console.log(error);
            if (error.error) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${error.error.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    });
  }
}
