import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CalendarRoutingModule} from './calendar-routing.module';
import {CalendarContainerComponent} from './calendar-container/calendar-container.component';
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatNativeDateModule} from "@angular/material/core";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import {SharedModule} from "../../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    CalendarContainerComponent,
    AddAppointmentComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatSelectModule,

  ]
})
export class CalendarModule {
}
