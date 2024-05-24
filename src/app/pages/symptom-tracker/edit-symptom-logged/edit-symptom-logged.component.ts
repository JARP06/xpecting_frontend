import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SymptomLogService } from 'src/app/services/symptom-log.service';
import { SymptomsService } from 'src/app/services/symptoms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-symptom-logged',
  templateUrl: './edit-symptom-logged.component.html',
  styleUrls: ['./edit-symptom-logged.component.css']
})
export class EditSymptomLoggedComponent implements OnInit {
  user_id: string = '';
  symptom_id: string = '';
  log_time: Date = new Date();
  selectedSymptomId: string = '';

  allSymptom: any;
  slId: any;
  symptom: any;

  constructor(
    private symptomLogService:SymptomLogService,
    private symptomService: SymptomsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) =>{
      this.slId = params ['slId']
    });
    this.getAllSymptoms();
    this.getSymptomLoggedData();
  }
  getAllSymptoms() {
    this.symptomService.getAllSymptoms().subscribe({
      next: (res) => {
        this.allSymptom = res.data;
      },
      error: (error) =>{
  
      }
    })
  }
  getSymptomLoggedData(){
    this.symptomLogService.getOneSymptomLogged(this.slId).subscribe((res)=>{
      if (res.status == 'error'){
      }else{
        this.symptom= res.data;
      }
    });
  }
  editLoggedSymptom(data:NgForm){
        // Format log_time before sending
        const formattedData = {
          ...data.value,
          log_time: new Date(data.value.log_time).toISOString()  // Convert to ISO string
      };
    this.symptomLogService.editSymptomLogged(data.value, this.slId).subscribe((res)=> {
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
