import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reserva-sala',
  templateUrl: './reserva-sala.page.html',
  styleUrls: ['./reserva-sala.page.scss'],
})
export class ReservaSalaPage implements OnInit {
  salas: any[] = []; // Lista de salas
  carregando = true; // Controle do carregamento

  constructor(private apiService: ApiService, private router: Router, private location: Location) {}

  ngOnInit() { // Log inicial
    this.carregarSalas();
  }

  // Carrega a lista de salas do back-end
  carregarSalas() {
    this.apiService.getSalas().subscribe(
      (data) => {// Log para depuração
        this.salas = data;
        this.carregando = false; // Finaliza o carregamento
      },
      (error) => {
        console.error('Erro ao buscar salas:', error);
        this.carregando = false; // Finaliza o carregamento mesmo com erro
      }
    );
  }

  // Navega para o calendário da sala escolhida
  selecionarSala(id: number, nome: string) {
    this.router.navigateByUrl(`/home/reserva-sala/${id}/calendario`, { state: { nome } });
  }

  voltar() {
    this.location.back(); // Volta para a página anterior
  }
}


