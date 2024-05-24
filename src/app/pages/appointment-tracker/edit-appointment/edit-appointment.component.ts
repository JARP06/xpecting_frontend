import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarersService } from 'src/app/services/carers.service';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit{

  user_id: string = '';
  carer_id: string = '';
  scheduled_time: Date = new Date();

  allCarers: any;
  aId: any;
  appointment: any;

  constructor(
    private appointmentService: AppointmentService,
    private carerService: CarersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.aId = params ['aId']
    });
    this.getAllCarers();
    this.getAppointmentData();
  }
  getAllCarers() {
    this.carerService.getAllCarer().subscribe({
      next: (res) => {
        this.allCarers = res.data;
      },
      error: (error) =>{
  
      }
    })
  }
  getAppointmentData(){
    this.appointmentService.getOneAppointment(this.aId).subscribe((res)=>{
      if (res.status == 'error'){
      }else{
        this.appointment= res.data;
      }
    });
  }
  editAppointment(data:NgForm){
    this.appointmentService.editAppointment(data.value, this.aId).subscribe((res)=> {
      if (res.status === 'success'){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Changes applied to appointment successfully.',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigateByUrl('/courses');
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
