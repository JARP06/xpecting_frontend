import { Component, OnInit } from '@angular/core';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarersService } from 'src/app/services/carers.service';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit{
user_id: string = '';
carer_id: string = '';
scheduled_time: Date = new Date();

allCarers: any;

  
constructor(
  private appointmentService: AppointmentService,
  private carerService: CarersService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  this.getAllCarers()
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
addNewAppointment(appointmentData: NgForm){
  this,this.appointmentService.addAppointment(appointmentData.value).subscribe((res) =>{
    if (res.status === 'success'){
      Swal.fire({
        position:'center',
        icon: 'success',
        title: 'Appointment added Successfully',
        showConfirmButton:false,
        timer: 1500,
      }).then(()=> {
        this.router.navigateByUrl('/appointments');
      });
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add appointment!'
      })
    }
  })
}
}
