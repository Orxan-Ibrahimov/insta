import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  styleUrls: ['./profile-edit-modal.component.scss'],
})
export class ProfileEditModalComponent implements OnInit {
  constructor() {}
  
  @Input('is_visible') visible :boolean = false;
  @Output() not_visible = new EventEmitter<void>();
  closeModal(event: Event) {
    this.visible = false;
    this.not_visible.emit();
  }
 
  ngOnInit(): void {}
}
