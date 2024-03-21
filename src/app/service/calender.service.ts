import {Injectable} from '@angular/core';
import {BehaviorSubject, filter} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  private calenderSubject$ = new BehaviorSubject<String | undefined>(new Date().toISOString());

  constructor() {
  }

  onCalendarChange(selectedDate: String | undefined) {
    this.calenderSubject$.next(selectedDate);
  }

  calenderObservable() {
    return this.calenderSubject$.asObservable()
      .pipe(filter(date => date !== undefined));
  }
}
