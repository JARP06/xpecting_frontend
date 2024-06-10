import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  lastPeriodDate: string | null = null;
  cycleLength: number = 28; 
  dueDate: string | null = null;
  alertMessage: string | null = null;

  calculateDueDate() {
    this.alertMessage = null; 

    if (!this.lastPeriodDate) {
      this.alertMessage = 'Please enter the last period date.';
      return;
    }

    const lastPeriod = new Date(this.lastPeriodDate);
    const today = new Date();
    const nineMonthsAgo = new Date(today);
    nineMonthsAgo.setMonth(nineMonthsAgo.getMonth() - 9);

    if (lastPeriod < nineMonthsAgo) {
      this.alertMessage = 'Last period date should not be more than 9 months ago.';
      return;
    }

    const adjustedCycleLength = this.cycleLength - 28;
    const dueDate = new Date(lastPeriod);
    dueDate.setDate(dueDate.getDate() + (280 + adjustedCycleLength));

    this.dueDate = dueDate.toISOString().split('T')[0];
  }
}
