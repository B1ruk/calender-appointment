import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {CalenderService} from "../service/calender.service";
import {AppointmentModel} from "../model/appointment.model";
import {AppointmentHelperService} from "../service/appointment-helper.service";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {flatMap, map, of, Subscription, tap} from "rxjs";
import {MatGridListModule} from "@angular/material/grid-list";
import {SharedModule} from "../shared/shared.module";

@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  imports: [CommonModule, CdkDropList, CdkDrag, CdkDragPlaceholder, MatIconModule, MatCardModule, MatDividerModule, MatGridListModule, SharedModule]
})
export class AppointmentComponent implements OnInit, OnDestroy {
  appointments: AppointmentModel[] = [];

  times = this.createTimeArray();
  calender$=this.calenderService.calenderObservable();

  // @ts-ignore
  appointmentSubscription$: Subscription;

  constructor(public calenderService: CalenderService, private appointmentHelperService: AppointmentHelperService) {
  }

  ngOnInit(): void {
    this.appointmentHelperService.loadContents();

    this.appointmentSubscription$ = this.calenderService
      .calenderObservable()
      .pipe(
        flatMap((selectedDate) => {
          if (selectedDate) {
            return this.appointmentHelperService
              .appointmentObservable()
              .pipe(map(data => this.appointmentHelperService.filterAppointmentsByDate(selectedDate, data)))
          }
          return of([]);
        })
      ).subscribe(data => this.appointments = data);

  }

  createTimeArray() {
    const timeArray = [];
    for (let hour = 9; hour <= 17; hour++) {
      const timeStr = hour < 12 ? `${hour} am` : `${hour - 12} pm`;
      timeArray.push({hour: hour, timeStr: timeStr});
    }
    return timeArray;
  }

// Get the array of times

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.times, event.previousIndex, event.currentIndex);
    console.log(this.times[event.previousIndex]);
    console.log(this.times[event.currentIndex]);
  }

  remove(index: number) {
    console.log(index);
    const appointment = this.getAppointment(index);
    console.log(appointment);
    console.log(`====================`);
    this.appointmentHelperService.removeAppointment(appointment);
  }

  appointmentTitle(i: number) {
    const appointment = this.getAppointment(i);
    return appointment ? appointment.title : '';
  }

  getAppointment(i: number) {
    const time = this.times[i];
    return this.appointments.find(appointment => appointment.startHour == time.hour);
  }

  ngOnDestroy() {
    this.appointmentSubscription$.unsubscribe();
  }

}
