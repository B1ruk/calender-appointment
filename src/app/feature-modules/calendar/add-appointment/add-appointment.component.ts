import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CalenderService} from "../../../service/calender.service";
import {AppointmentHelperService} from "../../../service/appointment-helper.service";
import {finalize, map} from "rxjs";
import {AppointmentModel} from "../../../model/appointment.model";

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;


  constructor(
    public dialogRef: MatDialogRef<AddAppointmentComponent>,
    private fb: FormBuilder,
    private calenderService: CalenderService,
    private appointmentHelperService: AppointmentHelperService
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      startHour: [null, [Validators.required, Validators.min(9), Validators.max(17)]],
      endHour: [null, [Validators.required, Validators.min(10), Validators.max(17)]],
    }, {validators: this.endTimeAfterStartTime});
  }

  ngOnInit(): void {

  }


  endTimeAfterStartTime(group: FormGroup) {
    // @ts-ignore
    const start = group.get('startHour').value;
    // @ts-ignore
    const end = group.get('endHour').value;
    return end > start ? null : {endTimeAfterStartTime: true};
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.calenderService.calenderObservable()
        .pipe(map(date => {
            const appointment: AppointmentModel = {
              ...this.appointmentForm.value,
              dateIso: date,
              id: 0
            }
            return this.appointmentHelperService.addAppointment(appointment);
          }),
          finalize(() => console.log('Done'))
        ).subscribe(() => {
        close();
      });

      // Submit the form data here
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }


}
