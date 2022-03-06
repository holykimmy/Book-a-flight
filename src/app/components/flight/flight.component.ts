import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightBookService } from 'src/app/services/flight-book.service';
import { Flight } from '../flight';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css'],
})
export class FlightComponent implements OnInit {
  flight: Flight[] = [];
  flightForm: FormGroup;
  minDate: Date;

  constructor(
    private fb: FormBuilder,
    private flightService: FlightBookService
  ) {
    this.flightForm = this.fb.group({
      fullName: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      type: ['', Validators.required],
      adults: ['', [Validators.required, Validators.pattern('^[0-9]{0,1}')]],
      departure: ['', Validators.required],
      children: ['', [Validators.required, Validators.pattern('^[0-9]{0,1}')]],
      infants: ['', [Validators.required, Validators.pattern('^[0-9]{0,1}')]],
      arrival: ['', Validators.required],
    });
    this.minDate = new Date();
    this.getFlight();
  }

  ngOnInit(): void {}

  getFlight() {
    this.flight = this.flightService.getFlight();
  }

  onSubmit(f: Flight): void {
    const departureYear = f.departure.getFullYear() + 543;
    const departureMonth = f.departure.getMonth();
    const departureDay = f.departure.getDate();
    const arrivalYear = f.arrival.getFullYear() + 543;
    const arrivalMonth = f.arrival.getMonth();
    const arrivalDay = f.arrival.getDate();
    f.departure = new Date(
      departureMonth + 1 + '/' + departureDay + '/' + departureYear
    );
    f.arrival = new Date(
      arrivalMonth + 1 + '/' + arrivalDay + '/' + arrivalYear
    );
    Swal.fire({
      title: 'Are you sure to confirm your flight',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#blueeyes',
      cancelButtonColor: '#salmon',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Confirmed', 'Your flight is successfully', 'success')
          .then(() => {
            this.flightService.addFlight(f);
          })
          .then(() => {
            this.flightForm.reset();
          });
      }
    });
  }
}
