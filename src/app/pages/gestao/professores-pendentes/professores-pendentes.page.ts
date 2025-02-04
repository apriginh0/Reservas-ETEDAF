import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-professores-pendentes',
  templateUrl: './professores-pendentes.page.html',
  styleUrls: ['./professores-pendentes.page.scss'],
})

export class ProfessoresPendentesPage implements OnInit {
  pendingUsers: any[] = [];

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit() {
    this.loadPendingUsers();
  }

  loadPendingUsers() {
    this.userService.getPendingUsers().subscribe(users => {
      this.pendingUsers = users;
    });
  }

  approveUser(userId: string) {
    this.userService.approveUser(userId).subscribe(() => {
      this.loadPendingUsers();
    });
  }

  rejectUser(userId: string) {
    this.userService.rejectUser(userId).subscribe(() => {
      this.loadPendingUsers();
    });
  }

  voltar() {
    this.location.back(); // Volta para a página anterior
  }
}
