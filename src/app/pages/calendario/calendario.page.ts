import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  breadcrumb: string = 'ETEDAF > Reserva de Salas'; // Valor padrão
  salaId: number = 0; // ID da sala selecionada
  selectedDate: string = ''; // Data selecionada pelo usuário
  salaNome: string | null = null; // Nome da sala selecionada

  minDate: string = ''; // Data mínima para o calendário
  maxDate: string = ''; // Data máxima para o calendário

  exibirAulas: boolean = false; // Controla a exibição das aulas
  exibirAulasReservadas: boolean = false; // Controla a exibição das opções de cancelamento
  aulasReservadasUsuario: string[] = []; // Apenas aulas reservadas pelo usuário
  aulasSelecionadasParaCancelar: string[] = []; // Aulas que o usuário deseja cancelar

  aulasDisponiveis: string[] = ['Aula 01', 'Aula 02', 'Aula 03', 'Aula 04', 'Aula 05', 'Aula 06', 'Aula 07', 'Aula 08', 'Aula 09']; // Aulas disponíveis
  aulasSelecionadas: string[] = []; // Aulas escolhidas
  componenteCurricular: string = ''; // Componente curricular
  anoTurma: string = ''; // Ano/Turma
  objetivo: string = ''; // Objetivo da aula

  aulasExibidas: { nome: string; reservada: boolean }[] = []; // Lista de aulas com status de reserva

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentDate = new Date();
    // Data mínima: 1 semana antes da data atual
    const min = new Date(currentDate);
    min.setDate(min.getDate() - 7);
    // Data máxima: 1 semana depois da data atual
    const max = new Date(currentDate);
    max.setDate(max.getDate() + 7);

    // Formate as datas no padrão ISO (yyyy-MM-ddTHH:mm:ss)
    this.minDate = min.toISOString().split('T')[0] + 'T00:00:00';
    this.maxDate = max.toISOString().split('T')[0] + 'T23:59:59';

    //-----------------------------------------------------------
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    this.salaNome = navigationState?.['nome'] || null;
    if (this.salaNome) {
      this.breadcrumb += ` > ${this.salaNome}`;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salaId = Number(id);
    }
  }

  onDateSelected(event: any) {
    // Captura o valor da data
    const rawDateStr = event.detail.value; // Exemplo: "2025-01-31T02:17:00"
    // Extrair apenas a parte da data (YYYY-MM-DD), ignorando a hora
    const dateOnlyStr = rawDateStr.split('T')[0]; // Resultado: "2025-01-31"
    // Garantindo que a data seja corretamente interpretada sem ajustes de fuso
    const [year, month, day] = dateOnlyStr.split('-').map(Number);
    const rawDate = new Date(year, month - 1, day); // Criar a data sem ajuste de fuso
    // Formatando a data para o formato brasileiro (DD-MM-YYYY)
    this.selectedDate = format(rawDate, 'yyyy-MM-dd', { locale: ptBR });

    this.apiService.getReservationsByDate(this.selectedDate, this.salaId).subscribe(
      (reservas) => {
        // Criar um novo array para restaurar todas as aulas disponíveis
        const aulasTotais = ['Aula 01', 'Aula 02', 'Aula 03', 'Aula 04', 'Aula 05', 'Aula 06', 'Aula 07', 'Aula 08', 'Aula 09'];
        // Pegando o ID do usuário logado
        const userId = this.authService.getUserId();
        // Filtrar apenas as reservas do dia selecionado
        const reservasDoDia = reservas.filter((reserva: any) => reserva.date === this.selectedDate);
        // Reservas do usuário logado
        const reservasUsuario = reservasDoDia.filter((reserva: any) => reserva.teacherId === userId);
        const aulasReservadasUsuario = reservasUsuario
          .map((reserva: any) => reserva.time.split(', '))
          .flat();

        this.aulasReservadasUsuario = aulasReservadasUsuario; // Salvar no estado da classe

        // Reservas de outros usuários
        const reservasOutros = reservasDoDia.filter((reserva: any) => reserva.teacherId !== userId);
        const aulasReservadasOutros = reservasOutros
          .map((reserva: any) => reserva.time.split(', '))
          .flat();

        // Filtrar as aulas disponíveis removendo as já reservadas para o dia selecionado
        this.aulasDisponiveis = aulasTotais.filter(aula =>
          !aulasReservadasOutros.includes(aula) &&
          !aulasReservadasUsuario.includes(aula)
        );

        // Criar uma estrutura para exibir as aulas do usuário em verde
        this.aulasExibidas = this.aulasDisponiveis.map(aula => ({
          nome: aula,
          reservada: aulasReservadasUsuario.includes(aula), // True se for uma reserva do usuário
        }));
      },
      (error) => {
        console.error('Erro ao buscar reservas:', error);
      }
    );
  }

  cancelarAulasSelecionadas() {
    if (!this.selectedDate || !this.salaId || this.aulasSelecionadasParaCancelar.length === 0) {
      console.error('Data, sala ou aulas selecionadas inválidas.');
      return;
    }

    // Buscar todas as reservas do dia e da sala selecionada
    this.apiService.getReservationsByDate(this.selectedDate, this.salaId).subscribe(
      (reservas) => {
        const userId = this.authService.getUserId(); // Obter ID do usuário logado

        // Filtrar apenas as reservas feitas no dia selecionado
        const reservasDoDia = reservas.filter((reserva: any) => reserva.date === this.selectedDate);

        if (reservasDoDia.length === 0) {
          console.error('Nenhuma reserva encontrada para este dia.');
          return;
        }

        // Filtrar as reservas feitas pelo usuário logado
        const reservasUsuario = reservasDoDia.filter((reserva: any) => reserva.teacherId === userId);

        if (reservasUsuario.length === 0) {
          console.error('Nenhuma reserva do usuário encontrada.');
          return;
        }

        // Para cada reserva do usuário, remover as aulas selecionadas
        reservasUsuario.forEach((reservaUsuario) => {
          const novasAulas = reservaUsuario.time.split(', ').filter((aula: string) =>
            !this.aulasSelecionadasParaCancelar.includes(aula)
          );

          if (novasAulas.length > 0) {
            // Atualiza a reserva no banco de dados
            this.apiService.updateReservation(reservaUsuario.id, { time: novasAulas.join(', ') }).subscribe(
              () => {
                this.resetForm(); // Resetar formulário em vez de atualizar a exibição manualmente
              },
              (error) => console.error('Erro ao atualizar reserva:', error)
            );
          } else {
            // Se todas as aulas foram removidas, excluir a reserva
            this.apiService.deleteReservation(reservaUsuario.id).subscribe(
              () => {
                this.resetForm(); // Resetar formulário em vez de atualizar a exibição manualmente
              },
              (error) => console.error('Erro ao excluir reserva:', error)
            );
          }
        });
      },
      (error) => console.error('Erro ao buscar reservas:', error)
    );
  }

  abrirOpcoesAulas() {

    this.exibirAulas = true; // Mostra as opções de aula
    this.exibirAulasReservadas = false;
  }

  abrirOpcoesCancelamento() {
    this.exibirAulasReservadas = true;
    this.exibirAulas = false;
  }

  agendar() {
    // Obtém a data e hora no fuso horário de São Paulo
    const createdAt = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');

    const reserva = {
      classId: this.salaId,
      date: this.selectedDate,
      time: this.aulasSelecionadas.join(', '),
      subject: this.componenteCurricular,
      classYear: this.anoTurma,
      objective: this.objetivo,
      createdAt: createdAt, // Adiciona a data formatada
    };

    // Enviar para o backend
    this.apiService.createReservation(reserva).subscribe(
      (response) => {
        alert('Reserva realizada com sucesso!');
        // Chamar a função para limpar o formulário
        this.resetForm();
      },
      (error) => {
        console.error('Erro ao realizar a reserva:', error);
        alert('Erro ao realizar a reserva. Tente novamente.');
      }
    );
  }

  voltar() {
    this.location.back(); // Volta para a página anterior
  }

  // Função para resetar os dados da página
  resetForm() {
    this.selectedDate = ''; // Limpar data selecionada
    this.exibirAulas = false; // Ocultar as aulas
    this.aulasSelecionadas = []; // Limpar seleção de aulas
    this.componenteCurricular = ''; // Limpar componente curricular
    this.anoTurma = ''; // Limpar ano/turma
    this.objetivo = ''; // Limpar objetivo

    // Resetando os estados específicos do cancelamento
    this.exibirAulasReservadas = false;
    this.aulasReservadasUsuario = [];
    this.aulasSelecionadasParaCancelar = [];
  }
}



