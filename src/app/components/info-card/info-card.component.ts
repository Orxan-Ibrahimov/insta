import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {
  constructor(private authService: AuthService) {}
  visible: boolean = false;
  showDialog() {
    this.visible = true;
  }

  LogOut() {
    this.authService.logout();
  }
  onModalClosed() {
    this.visible = false;
  }
  ngOnInit(): void {}
}
