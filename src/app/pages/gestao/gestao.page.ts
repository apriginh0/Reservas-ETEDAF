import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gestao',
  templateUrl: './gestao.page.html',
  styleUrls: ['./gestao.page.scss'],
})
export class GestaoPage {
  constructor(private location: Location) {}

  voltar() {
    this.location.back(); // Volta para a página anterior
  }
}

