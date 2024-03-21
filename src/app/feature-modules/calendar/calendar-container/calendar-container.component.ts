import {Component} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddAppointmentComponent} from "../add-appointment/add-appointment.component";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {CalenderService} from "../../../service/calender.service";

@Component({
  selector: 'app-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.scss']
})
export class CalendarContainerComponent {
  constructor(public dialog: MatDialog, public calenderService: CalenderService) {
  }

  selectedDate: Date = new Date(); // Initialize with current date

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    // this.selectedDate = event.value;
    console.log('Selected Date:', event.value);
    console.log('Selected Date:', event.value?.toISOString());

    this.calenderService.onCalendarChange(event.value?.toISOString())
    // Perform actions based on the selected date (e.g., update UI, call API)
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddAppointmentComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

}
