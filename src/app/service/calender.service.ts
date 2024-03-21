import {Injectable} from '@angular/core';
import {BehaviorSubject, filter, map} from "rxjs";
import {formatDate} from "../util/date-util";

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  private calenderSubject$ = new BehaviorSubject<String >(new Date().toISOString());

  constructor() {
  }

  onCalendarChange(selectedDate: String) {
    this.calenderSubject$.next(selectedDate);
  }

  calenderObservable() {
    // @ts-ignore
    return this.calenderSubject$.asObservable()
      .pipe(filter(date => date !== undefined),
        map(date => formatDate(date)));
  }
}
