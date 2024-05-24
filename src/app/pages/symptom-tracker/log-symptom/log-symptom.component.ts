import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomLogService } from 'src/app/services/symptom-log.service';
import { SymptomsService } from 'src/app/services/symptoms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-symptom',
  templateUrl: './log-symptom.component.html',
  styleUrls: ['./log-symptom.component.css']
})
export class LogSymptomComponent implements OnInit{
  user_id: string = '';
symptom_id: string = '';
log_time: Date = new Date();

selectedSymptomId: string = '';
selectedUserId: string = '';

allSymptom: any;

  
constructor(
  private symptomLogService: SymptomLogService,
  private symptomsService: SymptomsService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  this.getAllSymptom()
}
getAllSymptom() {
  this.symptomsService.getAllSymptoms().subscribe({
    next: (res) => {
      this.allSymptom = res.data;
    },
    error: (error) =>{

    }
  })
}
LogNewSymptom(symptomLogData: NgForm){
  this,this.symptomLogService.addToSymptomLog(symptomLogData.value).subscribe((res) =>{
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
