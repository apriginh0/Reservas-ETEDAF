import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-professores-cadastrados',
  templateUrl: './professores-cadastrados.page.html',
  styleUrls: ['./professores-cadastrados.page.scss'],
})
export class ProfessoresCadastradosPage implements OnInit {
  approvedUsers: any[] = [];

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit() {
    this.loadApprovedUsers();
  }

  loadApprovedUsers() {
    this.userService.getApprovedUsers().subscribe(users => {
      this.approvedUsers = users;
    });
  }

  changeRole(userId: string, currentRole: string) {
    const newRole = currentRole === 'teacher' ? 'admin' : 'teacher';
    this.userService.changeUserRole(userId, newRole).subscribe(() => {
      this.loadApprovedUsers();
    });
  }

  voltar() {
    this.location.back(); // Volta para a página anterior
  }
}

