import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DatePicker } from "@ionic-native/date-picker";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastController } from 'ionic-angular';

@Component({
  selector: "page-home",
  templateUrl: "appointment.html"
})
export class AppointmentPage {

  pages: Array<any>;

  private appointmentForm: FormGroup;

  selectedDate: any;

  constructor(
    public navCtrl: NavController,
    private datePicker: DatePicker,
    private formBuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {
    this.pages = [];
    console.log('here2')
    this.initializeForm();
  }

  initializeForm() {
    this.appointmentForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      number: [""],
      email: [""],
      home: [""],
      work: [""],
      carYear: [""],
      carModel: [""],
      carMake: [""],
      carEngine: [""],
      slot: [""]
    });
  }

  openCalender() {
    this.datePicker
      .show({
        date: new Date(),
        mode: "datetime",
        minuteInterval: 15,
        allowOldDates: false,
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      })
      .then(
        date => {
          debugger;
          this.selectedDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
          console.log(this.selectedDate);
        },
        err => console.log("Error occurred while getting date: ", err)
      );
  }

  saveAppointmentForm() {
    if(!this.selectedDate) {
      const toast = this.toastCtrl.create({
        message: 'Please enter a valid date',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
      return;
    }
    this.pages.push(this.appointmentForm.value);
    var bodyString = "";
    Object.keys(this.appointmentForm.value).forEach(key => {
      bodyString += `<p>${key} is ${this.appointmentForm.value[key]}</p>`;
    });
    bodyString += `<p>on ${this.selectedDate}</p>`
    var url = new URL("https://sleepy-oasis-76333.herokuapp.com/send");
    var url1 = new URL("https://sleepy-oasis-76333.herokuapp.com/send");
    var body1: any = {
      to: "bpamnani@gmail.com",
      subject: `Appointment Scheduled on ${this.selectedDate}`,
      text: bodyString
    };
    var body2: any = {
      to: this.appointmentForm.value.email,
      subject: `Appointment Scheduled with automobile on ${this.selectedDate}`,
      text: `Your appointment is successfully scheduled with automobile on ${this.selectedDate}`
    };
    Object.keys(body1).forEach(key => url.searchParams.append(key, body1[key]));
    window.fetch(url.href);
    Object.keys(body2).forEach(key => url1.searchParams.append(key, body2[key]));
    window.fetch(url1.href);
    this.initializeForm();
    this.selectedDate = "";
  }
}
