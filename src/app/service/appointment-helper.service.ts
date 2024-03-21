import {Injectable} from '@angular/core';
import {AppointmentModel} from "../model/appointment.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentHelperService {

  private appointment$ = new BehaviorSubject<AppointmentModel[]>([]);
  private appointments: AppointmentModel[] = [];

  constructor() {
  }

  addAppointment(appointmentModel: AppointmentModel) {
    if (this.isNotValidAddition(appointmentModel)) {
      return;
    }

    this.appointments = [...this.appointments, {...appointmentModel, id: this.appointments.length + 1}];
    this.appointment$.next(this.appointments);
    console.log(this.appointments);
  }

  isNotValidAddition(appointmentModel: AppointmentModel) {
    return this.appointments.find(appointment => {
      return appointment.startHour == appointmentModel.startHour
    });
  }

  appointmentObservable = () => {
    return this.appointment$.asObservable();
  };

  removeAppointment(appointment: AppointmentModel | undefined) {
    if (appointment) {
      this.appointments = this.appointments.filter(model => model.startHour !== appointment.startHour);
      this.appointment$.next(this.appointments);
    }
  }
}
