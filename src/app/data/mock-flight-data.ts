import { Flight } from '../components/flight';

export class mockFlightData {
  public static mfData: Flight[] = [
    {
      fullName: 'Kissakorn Budsa',
      from: 'Greenland',
      to: 'Japan',
      type: 'One way',
      adults: 1,
      departure: new Date('2565-03-15'),
      children: 2,
      infants: 3,
      arrival: new Date('2565-03-25'),
    },
  ];
}
