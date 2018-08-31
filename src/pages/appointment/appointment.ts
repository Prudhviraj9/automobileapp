import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'appointment.html'
})

export class AppointmentPage {

  showForm:boolean;

  pages: Array<any>;

  private appointmentForm : FormGroup;

  selectedDate: any;

  constructor(public navCtrl: NavController, private datePicker: DatePicker, private formBuilder: FormBuilder) {
    this.showForm = false;
    this.pages = [];

    this.initializeForm();
  }

  initializeForm() {
    this.appointmentForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      number: [''],
      email: [''],
      home: [''],
      work: [''],
      carYear: [''],
      carModel: [''],
      carMake: [''],
      carEngine: [''],
      slot: ['']
    });
  }

  openAppointmentForm() {
    this.showForm = true;
  }

  closeAppointmentForm() {
    this.showForm = false;
  }

  openCalender() {
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      minuteInterval: 15,
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.selectedDate = date;
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  saveAppointmentForm() {
    this.pages.push(this.appointmentForm.value);
    this.initializeForm();
  }
}
