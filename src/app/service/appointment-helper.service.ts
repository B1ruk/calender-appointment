import {Injectable} from '@angular/core';
import {AppointmentModel} from "../model/appointment.model";
import {BehaviorSubject, tap} from "rxjs";
import {formatDate} from "../util/date-util";

@Injectable({
  providedIn: 'root'
})
export class AppointmentHelperService {

  APPOINTMENT_LIST = 'APPOINTMENT_LIST';

  private appointments: AppointmentModel[] = [];

  private appointment$ = new BehaviorSubject<AppointmentModel[]>([]);

  constructor() {

  }

  loadContents() {
    this.appointment$.next(this.loadStorage());
  }

  private loadStorage() {
    const data = localStorage.getItem(this.APPOINTMENT_LIST);
    if (data) {
      console.log(data);
      return JSON.parse(data);
    }
    return [];
  }

  addAppointment(appointmentModel
                   :
                   AppointmentModel
  ) {
    if (this.isNotValidAddition(appointmentModel)) {
      return;
    }

    this.appointments = [...this.appointments, {...appointmentModel, id: this.appointments.length + 1}];
    this.appointment$.next(this.appointments);
    console.log(this.appointments);
  }

  isNotValidAddition(appointmentModel
                       :
                       AppointmentModel
  ) {
    return this.appointments.find(appointment => {
      return appointment.startHour == appointmentModel.startHour
    });
  }

  appointmentObservable = () => {
    // @ts-ignore
    return this.appointment$.asObservable()
      .pipe(tap(appointments => {
        localStorage.setItem(this.APPOINTMENT_LIST, JSON.stringify(appointments))
      }));
  };

   filterAppointmentsByDate<A>(dateIso: string, appointmentList: AppointmentModel[]) {
    const currentDate = formatDate(dateIso);

    return appointmentList.filter(model => {
      const appointmentDate = formatDate(model.dateIso);

      console.log(`evaluating date ${currentDate} --- with ${appointmentDate}`)
      return appointmentDate == currentDate;
    })
  }

  removeAppointment(appointment
                      :
                      AppointmentModel | undefined
  ) {
    if (appointment) {
      this.appointments = this.appointments.filter(model => model.startHour !== appointment.startHour);
      this.appointment$.next(this.appointments);
    }
  }
}
