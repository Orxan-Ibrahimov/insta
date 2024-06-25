import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent implements OnInit {

  constructor() { }
  visible:boolean = false;
  showDialog(){
    this.visible = true;
  }
 
  onModalClosed() {
    this.visible = false;
  }
  ngOnInit(): void {

  }

}
