import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  template: `
    <div class="mt-3 d-flex justify-content-center">
      <nav aria-label="Page navigation">
        <ul class="pagination">
        <a class="page-link" href="#" (click)="goToPage(currentPage - 1, $event)" aria-label="Previous">
  <span aria-hidden="true">&laquo;</span>
  <span class="sr-only">Previous</span>
</a>

<ng-container *ngFor="let page of pageButtons">
  <li class="page-item" [ngClass]="{'active': page === currentPage}">
    <a class="page-link" href="#" (click)="goToPage(page, $event)">{{ page }}</a>
  </li>
</ng-container>


<li class="page-item" [ngClass]="{'disabled': currentPage === maxPages}">
<a class="page-link" href="#" (click)="goToPage(currentPage + 1, $event)" aria-label="Next">
  <span aria-hidden="true">&raquo;</span>
  <span class="sr-only">Next</span>
</a>

</li>

        </ul>
      </nav>
    </div>
  `,
  styles: []
})
export class PaginatorComponent implements OnInit {
  @Input() maxPages: number = 0;
  @Input() currentPage: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  get pageButtons(): number[] {
    return Array.from({ length: this.maxPages }, (_, i) => i + 1);
  }

  goToPage(newPage: number, event: MouseEvent): void {
    event.preventDefault(); 
    this.pageChange.emit(newPage);
  }
  
  
}
