import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { DetalhesModalComponent } from './detalhes-modal/detalhes-modal.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamentos.page.html',
  styleUrls: ['./agendamentos.page.scss'],
})
export class AgendamentosPage implements OnInit {
  salas: any[] = [];
  reservas: any[] = [];
  diasDoMes: string[] = [];
  salaAbertaId: number | null = null;

  constructor(
    private api: ApiService,
    private modalController: ModalController,
    private location: Location
  ) {}

  ngOnInit() {
    const hoje = new Date();
    this.diasDoMes = this.getDiasDoMes(hoje.getMonth(), hoje.getFullYear());

    this.api.getSalas().subscribe((salas) => this.salas = salas);
    this.api.getReservations().subscribe((reservas) => this.reservas = reservas);
  }

  getDiasDoMes(mes: number, ano: number): string[] {
    const dias: string[] = [];
    const totalDias = new Date(ano, mes + 1, 0).getDate();

    for (let dia = 1; dia <= totalDias; dia++) {
      const data = new Date(ano, mes, dia);
      dias.push(data.toISOString().split('T')[0]); // formato yyyy-MM-dd
    }

    return dias;
  }

  formatarData(dataISO: string): string {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}-${mes}-${ano}`;
  }

  toggleSala(salaId: number) {
    this.salaAbertaId = this.salaAbertaId === salaId ? null : salaId;
  }

  voltar() {
    this.location.back(); // Volta para a página anterior
  }

  async abrirModal(sala: any, data: string) {
    const modal = await this.modalController.create({
      component: DetalhesModalComponent,
      componentProps: {
        sala,
        data,
        reservas: this.reservas
      }
    });
    await modal.present();
  }
}


