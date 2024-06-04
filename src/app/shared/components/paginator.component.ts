import { Component,EventEmitter,Input,OnInit,Output } from '@angular/core';


  @Component({
    selector: 'app-paginator',
    template:`
    <div class="mt-0 xs:flex-row xs:justify-between flex flex-col items-center px-2 py-2 bg-white border-t">
      <div class="xs:mt-0.inline-flex.gap-2.mt-2">
        <button [ngClass]="{'invisible' : currentPage === 1}"
            (click)="goToPage(currentPage!-1)"
            class="text-red-50 hover:bg-blue-500 bg-blue-400 px-2 text-sm font-semibold rounded-l "
            >
            <i class= "fa-solid fa-arrow-left"></i>
            Prev
        </button>
    <!-- Page buttons -->
        <button *ngFor="let page of pageButtons | slice: lowerButtonLimit: upperButtonLimit" 
        [ngClass]="{'primary-bg-text-white' : page === currentPage, 'bg-blue-300 text-blue-700':page !== currentPage}"
            (click)="goToPage(page)"
            class="text-red-50 hover:bg-blue-500 bg-blue-400 px-2 text-sm font-semibold border-2 border-secondary-500"
            >
            {{page}}
        </button>
        <button [ngClass]="{'invisible' : currentPage === maxPages}"
            (click)="goToPage(currentPage! + 1)"
            class="text-red-50 hover:bg-blue-500 bg-blue-400 px-2 text-sm font-semibold rounded-l "
            >
            Next
            <i class= "fa-solid fa-arrow-right"></i>
        </button>

      </div>/.xs:mt-0.inline-flex.gap-2.mt-2
    </div>/.mt-0.xs:flex-row.xs:justify-between.flex.flex-col.items-center.px-2.py-2.bg-white.border-t
    `,
    styles: [
    ]
    })
    export class PaginatorComponent implements OnInit {
    @Input('maxPages') maxPages: number = 0;
    @Input('currentPage') currentPage: number = 0;
    @Output ('pageChange' ) onPageChange = new EventEmitter<number>();
    
    constructor() { }

    buttonLimit: number = 5;
    get lowerButtonLimit(): number{
      return Math.abs(this.currentPage / this.buttonLimit) < 1 ? 0: this.currentPage - 3;
    }

    get upperButtonLimit(): number{
      return Math.min(this.maxPages, Math.abs(this.currentPage / this.buttonLimit)< 1 ? this.buttonLimit : this.currentPage + 2) ;
    }

    get pageButtons(): number[]{
      return new Array(this.maxPages).fill(null).map((v, i)=> i+ 1);
    }
    goToPage(newPage: number):void {
      this.onPageChange.emit(newPage)
    }

ngOnInit(): void {
  
}

}
