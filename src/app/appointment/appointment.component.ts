import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {CalenderService} from "../service/calender.service";
import {AppointmentModel} from "../model/appointment.model";
import {AppointmentHelperService} from "../service/appointment-helper.service";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  imports: [CommonModule, CdkDropList, CdkDrag, CdkDragPlaceholder, MatIconModule]
})
export class AppointmentComponent implements OnInit {
  appointments: AppointmentModel[] = [];

  times = this.createTimeArray();

  constructor(public calenderService: CalenderService, private appointmentHelperService: AppointmentHelperService) {
  }

  ngOnInit(): void {
    this.appointmentHelperService
      .appointmentObservable()
      .subscribe(appointmentList => {
        this.appointments = appointmentList;
      })
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

}
