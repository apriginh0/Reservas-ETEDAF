import { Component} from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent  {
  reservation = {
    date:'',
    time: '',
    component: '',
    classGroup:'',
    objective: '',
    projector: '',
    speaker: '',
    reservedBy: '',
  }

  constructor(private reservationService: ReservationService) {}

  //Funcão para enviar formulário
  onSubmit() {
    this.reservationService.createReservation(this.reservation).subscribe(
      response => {
        alert('Reserva feita com sucesso!');
      },
      error => {
        console.error('Erro ao criar reserva:', error);
        alert('Erro ao realizar a reserva.');
      }
    );
  }
}
