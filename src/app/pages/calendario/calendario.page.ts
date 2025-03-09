import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { map, switchMap } from 'rxjs';
import { format, previousDay, startOfToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ViewChild, ElementRef } from '@angular/core';
import { Keyboard } from '@capacitor/keyboard';
import { IonContent } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {
  keyboardHeight: number = 0;
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

  aulasDisponiveis: string[] = ['Aula 01', 'Aula 02', 'Aula 03', 'Aula 04', 'Aula 05', 'Aula 06', 'Aula 07', 'Aula 08', 'Aula 09', 'Noite 1', 'Noite 2', 'Noite 3', 'Noite 4', 'Noite 5']; // Aulas disponíveis
  aulasSelecionadas: string[] = []; // Aulas escolhidas
  componenteCurricular: string = ''; // Componente curricular
  anoTurma: string = ''; // Ano/Turma
  objetivo: string = ''; // Objetivo da aula

  aulasExibidas: { nome: string; reservada: boolean }[] = []; // Lista de aulas com status de reserva

  turmas: string[] = ['1º DG - A', '1º DG - B', '1º ST', '2º DG - A', '2º DG - B', '2º ST', '3º DG', '3º ST', 'SUB ST 1', 'SUB ST 2', 'SUB ST 3', 'SUB DG 3'];

  @ViewChild('componenteCurricularInput', { read: ElementRef })
  componenteCurricularInput!: ElementRef;
  @ViewChild(IonContent) ionContent!: IonContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private apiService: ApiService,
    private authService: AuthService,
    private platform: Platform
  ) {
    Keyboard.addListener('keyboardWillShow', (info) => {
      this.keyboardHeight = info.keyboardHeight;
      document.documentElement.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      document.documentElement.style.removeProperty('--keyboard-height');
    });
  }

  ngOnInit() {
    this.calcularDatas(); // ✅ Calcula datas baseadas no sábado

    //-----------------------------------------------------------
    // Resto do código (navegação, salaId, etc.) permanece igual:
    const navigationState = this.router.getCurrentNavigation()?.extras.state;
    this.salaNome = navigationState?.['nome'] || null;
    if (this.salaNome) {
      this.breadcrumb += ` > ${this.salaNome}`;
    }

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.salaId = Number(id);
    }

    // Atualiza automaticamente no sábado à meia-noite
    setInterval(() => {
      this.calcularDatas();
    }, 60000); // Verifica a cada minuto
  }

  calcularDatas() {
    const hoje = startOfToday(); // Data atual sem hora
    let ultimoSabado: Date;
    console.log('Data atual:', hoje.toISOString()); // ✅ Log da data atual

    // Se hoje for sábado (dia 6), use hoje. Senão, busque o próximo sábado.
    if (hoje.getDay() === 6) { // 6 = Sábado
      ultimoSabado = new Date(hoje); // Hoje já é sábado
      console.log(hoje.getDay());
      console.log('Hoje é sábado. Usando data atual:', ultimoSabado.toISOString());
    } else {
      ultimoSabado = previousDay(hoje, 6); // Sábado anterior
      console.log('Sábado anterior encontrado:', ultimoSabado.toISOString());
    }

    // Define minDate como o sábado à 00:00
    this.minDate = ultimoSabado.toISOString();
    console.log('minDate definido:', this.minDate);

    // Define maxDate como a sexta-feira seguinte à 23:59
    const maxDate = new Date(ultimoSabado);
    maxDate.setDate(ultimoSabado.getDate() + 6);
    maxDate.setHours(23, 59, 59);
    this.maxDate = maxDate.toISOString();
    console.log('maxDate definido:', this.maxDate);
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

    this.authService.getCurrentUser().pipe(
      switchMap(user => {
        const userId = user.id;
        return this.apiService.getReservationsByDate(this.selectedDate, this.salaId).pipe(
          map(reservas => ({ reservas, userId }))
        );
      })
    ).subscribe(
      ({reservas, userId}) => {
        // Criar um novo array para restaurar todas as aulas disponíveis
        const aulasTotais = ['Aula 01', 'Aula 02', 'Aula 03', 'Aula 04', 'Aula 05', 'Aula 06', 'Aula 07', 'Aula 08', 'Aula 09', 'Noite 1', 'Noite 2', 'Noite 3', 'Noite 4', 'Noite 5'];
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
      (error) => console.error('Erro ao buscar reservas:', error)
    );
  }

  cancelarAulasSelecionadas() {
    if (!this.selectedDate || !this.salaId || this.aulasSelecionadasParaCancelar.length === 0) {
      console.error('Data, sala ou aulas selecionadas inválidas.');
      return;
    }

    this.authService.getCurrentUser().pipe(
      switchMap(user => {
        const userId = user.id;
        return this.apiService.getReservationsByDate(this.selectedDate, this.salaId).pipe(
          map(reservas => ({ reservas, userId }))
        );
      })
    ).subscribe(
      ({reservas, userId}) => {
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

  async scrollToInput() {
    if (!this.componenteCurricularInput?.nativeElement) {
      console.error('Input não encontrado!'); //
      return;
    }
    // Aguardar um pequeno delay para garantir que o teclado está visível
    setTimeout(async () => {
      const inputElement = this.componenteCurricularInput.nativeElement;
      const scrollEl = await this.ionContent.getScrollElement();

      // Cálculo da posição (ajustado para evitar valores negativos)
      const inputRect = inputElement.getBoundingClientRect();
      const scrollTop = scrollEl.scrollTop;
      const inputPosition = inputRect.top + scrollTop;

      // Scroll para posição centralizada
      this.ionContent.scrollToPoint(0, inputPosition - 150, 300);
    }, 300); // Delay para sincronizar com a abertura do teclado
  }
}



