import { Component, OnInit } from '@angular/core';
import { SymptomLogService } from 'src/app/services/symptom-log.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-symptom-logged',
  templateUrl: './delete-symptom-logged.component.html',
  styleUrls: ['./delete-symptom-logged.component.css']
})
export class DeleteSymptomLoggedComponent implements OnInit {
  symptomLogId: number | undefined;

  constructor(
    private symptomLogService: SymptomLogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.symptomLogId = +params['slId'];
      if (this.symptomLogId) {
        this.confirmDeleteSymptomLogged(this.symptomLogId);
      }
    });
  }

  confirmDeleteSymptomLogged(symptomLogId: number): void {
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
        this.deleteSymptomLogged(symptomLogId);
      } else {
        this.router.navigateByUrl('/all-logged-symptoms');
      }
    });
  }

  deleteSymptomLogged(symptomLogId: number): void {
    this.symptomLogService.deleteSymptomLog(symptomLogId).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Symptom logged deleted successfully',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigateByUrl('/all-logged-symptoms');
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to delete logged symptom!'
        });
      }
    });
  }
}
