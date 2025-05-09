import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

interface Professor {
  id: number;
  name: string;
}

@Component({
  selector: 'app-detalhes-modal',
  templateUrl: './detalhes-modal.component.html',
  styleUrls: ['./detalhes-modal.component.scss'],
})
export class DetalhesModalComponent implements OnInit {
  @Input() sala: any;
  @Input() data!: string;
  @Input() reservas!: any[];

  aulas = [
    'Aula 01', 'Aula 02', 'Aula 03', 'Aula 04', 'Aula 05',
    'Aula 06', 'Aula 07', 'Aula 08', 'Aula 09',
    'Noite 1', 'Noite 2', 'Noite 3', 'Noite 4', 'Noite 5'
  ];

  resultados: { aula: string, professor: string }[] = [];

  constructor(
    private api: ApiService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    const reservasSalaData = this.reservas.filter(res =>
      res.classId === this.sala.id && res.date === this.data);

    const professoresResponse = await firstValueFrom(this.api.getProfessores());
    const professores: Professor[] = professoresResponse.data;

    this.resultados = this.aulas.map(aula => {
      const reserva = reservasSalaData.find(res => res.time.includes(aula));
      if (reserva) {
        const user = professores.find(u => u.id === reserva.teacherId);
        return { aula, professor: user?.name || 'Desconhecido' };
      } else {
        return { aula, professor: 'Disponível' };
      }
    });
  }

  formatarData(dataISO: string): string {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}-${mes}-${ano}`;
  }

  fechar() {
    this.modalController.dismiss();
  }
}
